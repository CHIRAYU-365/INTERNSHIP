require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let cachedConnection = global.mongoose;
if (!cachedConnection) {
    cachedConnection = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
    if (cachedConnection.conn) return cachedConnection.conn;
    if (!MONGODB_URI) {
        console.error('CRITICAL: MONGODB_URI environment variable is missing.');
        throw new Error('Database connection string is missing.');
    }
    if (!cachedConnection.promise) {
        cachedConnection.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongooseInstance) => {
            console.log('Database connection initialized successfully.');
            return mongooseInstance;
        });
    }
    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
}

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    gitId: { type: String, default: null },
    description: { type: String, default: 'No description provided.' },
    techs: { type: [String], default: [] },
    liveUrl: { type: String, default: null }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

let knownTechNames = [];
try {
    const techData = JSON.parse(fs.readFileSync(path.join(__dirname, 'technologies.json'), 'utf8'));
    knownTechNames = techData.map(t => t.name);
} catch (e) {
    console.error('Failed to load technologies.json in server.js:', e);
}

// Helper to make native HTTPS GET requests to avoid global fetch issues on older Node versions in serverless runtimes
function requestGet(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'CyberFolio-App'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(data);
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

app.get('/api/projects', async (req, res) => {
    try {
        await connectToDatabase();
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        console.error('GET projects failed:', err);
        res.status(500).json({ error: 'Failed to fetch projects from the database.' });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        await connectToDatabase();
        const projectData = req.body;
        
        if (!projectData.name) {
            return res.status(400).json({ error: 'Project name is required.' });
        }

        const project = await Project.findOneAndUpdate(
            { name: projectData.name },
            projectData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(201).json({ success: true, project });
    } catch (err) {
        console.error('POST project failed:', err);
        res.status(500).json({ error: 'Failed to save the project.' });
    }
});

app.delete('/api/projects/:name', async (req, res) => {
    try {
        await connectToDatabase();
        const projectName = req.params.name;
        
        const deletedProject = await Project.findOneAndDelete({ name: projectName });
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.status(200).json({ success: true, message: 'Project deleted permanently.' });
    } catch (err) {
        console.error('DELETE project failed:', err);
        res.status(500).json({ error: 'Failed to delete the project.' });
    }
});

app.post('/api/analyze', async (req, res) => {
    const { gitId } = req.body;
    if (!gitId) {
        return res.status(400).json({ error: 'GitHub Repository ID is required.' });
    }

    try {
        let repoData;
        try {
            const rawData = await requestGet(`https://api.github.com/repos/${gitId}`);
            repoData = JSON.parse(rawData);
        } catch (e) {
            return res.status(404).json({ error: 'Repository not found on GitHub.' });
        }

        let readmeContent = '';
        const readmeBranches = ['main', 'master'];
        for (const branch of readmeBranches) {
            try {
                readmeContent = await requestGet(`https://raw.githubusercontent.com/${gitId}/${branch}/README.md`);
                break;
            } catch (e) {}
        }

        if (!GEMINI_API_KEY) {
            console.warn('GEMINI_API_KEY is missing. Using static fallback analysis.');
            const fallbackTechs = [];
            try {
                const rawLangData = await requestGet(`https://api.github.com/repos/${gitId}/languages`);
                const langData = JSON.parse(rawLangData);
                Object.keys(langData).forEach(lang => {
                    const match = knownTechNames.find(t => t.toLowerCase() === lang.toLowerCase());
                    if (match) fallbackTechs.push(match);
                });
            } catch (e) {
                console.warn('Failed to parse repository languages:', e);
            }
            return res.json({
                name: repoData.name,
                description: repoData.description || 'Auto-generated metadata from repository.',
                techs: fallbackTechs,
                liveUrl: repoData.homepage || null
            });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a technical portfolio assistant. Analyze the following GitHub repository metadata and README file content.

Repository Name: ${repoData.name}
Repository Description: ${repoData.description || ''}
README File Content:
${readmeContent.slice(0, 8000)}

Based on this information, perform these tasks:
1. Write a professional, concise summary of this project (max 2-3 sentences). Focus on what the project does and the user's role or accomplishments.
2. Select all matching technologies that were used to build this project. You must select ONLY from this list:
${knownTechNames.join(', ')}

Output your response strictly as a JSON object matching this schema:
{
  "description": "string",
  "techs": ["string", "string"]
}

Your output must be raw JSON. Do not include markdown formatting (like \`\`\`json).`;

        const response = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const resultJson = JSON.parse(response.response.text().trim());
        res.json({
            name: repoData.name,
            description: resultJson.description || repoData.description,
            techs: resultJson.techs || [],
            liveUrl: repoData.homepage || null
        });

    } catch (err) {
        console.error('AI Analysis failed:', err);
        res.status(500).json({ error: 'Failed to complete AI analysis.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server launched successfully at http://localhost:${PORT}`);
});

module.exports = app;

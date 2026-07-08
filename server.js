require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

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

app.listen(PORT, () => {
    console.log(`Server launched successfully at http://localhost:${PORT}`);
});

module.exports = app;

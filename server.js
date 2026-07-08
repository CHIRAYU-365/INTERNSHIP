require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

// Robust Serverless Database Connection
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URI) {
        console.warn('WARNING: MONGODB_URI is not set.');
        throw new Error('MONGODB_URI is not set');
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => {
            console.log('Successfully connected to MongoDB.');
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

// Define the Project Schema
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    gitId: { type: String, default: null },
    description: { type: String },
    techs: { type: [String], default: [] },
    liveUrl: { type: String, default: null }
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

// Read all projects
app.get('/api/projects', async (req, res) => {
    try {
        await connectDB();
        const projects = await Project.find({});
        res.json(projects);
    } catch (err) {
        console.error('Fetch Error:', err);
        res.status(500).json({ error: 'Failed to fetch projects from database' });
    }
});

// Add a project
app.post('/api/projects', async (req, res) => {
    try {
        await connectDB();
        const newProjectData = req.body;
        
        // Upsert to avoid duplicates
        const savedProject = await Project.findOneAndUpdate(
            { name: newProjectData.name },
            newProjectData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ success: true, project: savedProject });
    } catch (err) {
        console.error('Save Error:', err);
        res.status(500).json({ error: 'Failed to save project' });
    }
});

// Remove a project
app.delete('/api/projects/:name', async (req, res) => {
    try {
        await connectDB();
        const projectName = req.params.name;
        const result = await Project.findOneAndDelete({ name: projectName });
        
        if (!result) {
             return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app;

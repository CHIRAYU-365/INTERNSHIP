require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Serve static files from the current directory
app.use(express.static(__dirname));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Failed to connect to MongoDB', err));
} else {
    console.warn('WARNING: MONGODB_URI is not set. Database operations will fail.');
}

// Define the Project Schema
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    gitId: { type: String, default: null },
    description: { type: String },
    techs: { type: [String], default: [] },
    liveUrl: { type: String, default: null }
});

const Project = mongoose.model('Project', projectSchema);

// Read all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch projects from database' });
    }
});

// Add a project
app.post('/api/projects', async (req, res) => {
    try {
        const newProjectData = req.body;
        
        // Use findOneAndUpdate with upsert to prevent duplicates by name
        const savedProject = await Project.findOneAndUpdate(
            { name: newProjectData.name },
            newProjectData,
            { new: true, upsert: true }
        );

        res.json({ success: true, project: savedProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save project' });
    }
});

// Remove a project
app.delete('/api/projects/:name', async (req, res) => {
    try {
        const projectName = req.params.name;
        await Project.findOneAndDelete({ name: projectName });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Export the Express API for Vercel Serverless Functions
module.exports = app;

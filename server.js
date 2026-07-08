const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const PROJECTS_FILE = path.join(__dirname, 'projects.json');

app.use(cors());
app.use(express.json());
// Serve static files from the current directory
app.use(express.static(__dirname));

// Read projects
app.get('/api/projects', (req, res) => {
    fs.readFile(PROJECTS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read projects file' });
        }
        try {
            res.json(JSON.parse(data));
        } catch (e) {
            res.json([]);
        }
    });
});

// Add a project
app.post('/api/projects', (req, res) => {
    const newProject = req.body;
    fs.readFile(PROJECTS_FILE, 'utf8', (err, data) => {
        let projects = [];
        if (!err && data) {
            try {
                projects = JSON.parse(data);
            } catch (e) {}
        }
        
        // Prevent duplicates by name
        if (!projects.find(p => p.name === newProject.name)) {
            projects.push(newProject);
        }

        fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to save project' });
            res.json({ success: true, project: newProject });
        });
    });
});

// Remove a project
app.delete('/api/projects/:name', (req, res) => {
    const projectName = req.params.name;
    fs.readFile(PROJECTS_FILE, 'utf8', (err, data) => {
        let projects = [];
        if (!err && data) {
            try {
                projects = JSON.parse(data);
            } catch (e) {}
        }
        
        const filteredProjects = projects.filter(p => p.name !== projectName);

        fs.writeFile(PROJECTS_FILE, JSON.stringify(filteredProjects, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update projects file' });
            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

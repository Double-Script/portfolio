const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const Project = require('./model/Project');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected...');
        seedDB(); // Call the function to seed the database
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Seeding function
const seedDB = async () => {
    const sampleProjects = [
        {
            logo: 'https://via.placeholder.com/100',
            title: 'Project One',
            description: 'This is a description for project one.',
            linkText: 'View Project',
            link: 'https://github.com/Double-Script/first-project'
        },
        {
            logo: 'https://via.placeholder.com/100',
            title: 'Project Two',
            description: 'This is a description for project two.',
            linkText: 'View Project',
            link: 'https://github.com/Tejascodez/gemini-clone.git'
        },
        {
            logo: 'https://via.placeholder.com/100',
            title: 'Project Three',
            description: 'This is a description for project three.',
            linkText: 'View Project',
            link: 'https://github.com/Tejascodez/Delta-simon.git'
        }
    ];

    try {
        await Project.deleteMany({});
        await Project.insertMany(sampleProjects);
        console.log('Sample data inserted successfully!');
    } catch (err) {
        console.error('Error inserting sample data:', err);
    }
};

app.get('/', async (req,res)=>{
    res.send("Hello MongoDB");
})

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

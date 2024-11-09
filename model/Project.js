
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    logo: String,
    title: String,
    description: String,
    linkText: String,
    link: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

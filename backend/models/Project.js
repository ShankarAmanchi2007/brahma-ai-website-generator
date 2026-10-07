const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true,
    default: 'Untitled Project'
  },
  originalPrompt: {
    type: String,
    required: true
  },
  generatedCode: {
    type: String,
    default: ''
  },
  framework: {
    type: String,
    default: 'react'
  },
  status: {
    type: String,
    enum: ['draft', 'generating', 'ready', 'deployed', 'failed'],
    default: 'ready'
  },
  deploymentUrl: {
    type: String,
    default: ''
  },
  deploymentId: {
    type: String,
    default: ''
  },
  deployedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);

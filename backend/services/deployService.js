const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { projectRepo, fileRepo } = require('../models/dbRepository');

const DEPLOY_DIR = path.join(__dirname, '..', 'deployments');

if (!fs.existsSync(DEPLOY_DIR)) {
  fs.mkdirSync(DEPLOY_DIR, { recursive: true });
}

class DeployService {
  /**
   * Deploys a project to a dedicated public route
   */
  async deployProject(projectId, hostBaseUrl = '') {
    const project = await projectRepo.findById(projectId);
    if (!project) throw new Error('Project not found');

    const files = await fileRepo.find({ projectId });
    if (!files || files.length === 0) {
      throw new Error('No files found to deploy for this project');
    }

    // Find index.html or generated code
    const indexHtmlFile = files.find(f => f.fileName === 'index.html' || f.filePath === 'index.html');
    const htmlContent = indexHtmlFile ? indexHtmlFile.content : project.generatedCode;

    if (!htmlContent) {
      throw new Error('No valid HTML entry point found for deployment');
    }

    const deploymentId = uuidv4().slice(0, 12);
    const projectDeployDir = path.join(DEPLOY_DIR, deploymentId);
    fs.mkdirSync(projectDeployDir, { recursive: true });

    // Write index.html to deployment folder
    fs.writeFileSync(path.join(projectDeployDir, 'index.html'), htmlContent, 'utf8');

    // Write any other files as well
    for (const f of files) {
      const targetPath = path.join(projectDeployDir, f.filePath.replace(/\\/g, '/'));
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, f.content, 'utf8');
    }

    const livePath = `/live/${deploymentId}`;
    const fullUrl = hostBaseUrl ? `${hostBaseUrl}${livePath}` : livePath;

    // Update project with deployment details
    const updatedProject = await projectRepo.findByIdAndUpdate(projectId, {
      status: 'deployed',
      deploymentId,
      deploymentUrl: fullUrl,
      deployedAt: new Date()
    });

    return {
      deploymentId,
      deploymentUrl: fullUrl,
      deployedAt: new Date(),
      status: 'live',
      project: updatedProject
    };
  }

  /**
   * Retrieves deployed HTML for a given deployment ID
   */
  getDeploymentHtml(deploymentId) {
    const filePath = path.join(DEPLOY_DIR, deploymentId, 'index.html');
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return null;
  }
}

module.exports = new DeployService();

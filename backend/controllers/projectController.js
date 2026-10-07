const { projectRepo, messageRepo, fileRepo } = require('../models/dbRepository');
const aiService = require('../services/aiService');
const { createProjectZipStream } = require('../services/zipService');
const deployService = require('../services/deployService');

// POST /api/projects
exports.createProject = async (req, res, next) => {
  try {
    const { prompt, projectName } = req.body;
    const userId = req.user.id;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A descriptive website prompt is required'
      });
    }

    console.log(`[Project] Creating new project for user ${userId} with prompt: "${prompt.slice(0, 50)}..."`);

    // 1. Generate code using AI Service
    const aiOutput = await aiService.generateWebsite(prompt);

    const finalProjectName = projectName && projectName.trim() ? projectName.trim() : aiOutput.projectName;

    // 2. Create project in DB
    const project = await projectRepo.create({
      userId,
      projectName: finalProjectName,
      originalPrompt: prompt.trim(),
      generatedCode: aiOutput.previewHtml,
      framework: aiOutput.framework || 'react',
      status: 'ready'
    });

    const projectId = project._id ? project._id.toString() : project.id;

    // 3. Save initial chat messages
    await messageRepo.create({
      projectId,
      role: 'user',
      message: prompt.trim()
    });

    await messageRepo.create({
      projectId,
      role: 'assistant',
      message: aiOutput.explanation || `I've generated your complete "${finalProjectName}" website with responsive styling and components.`
    });

    // 4. Save generated files
    if (aiOutput.files && Array.isArray(aiOutput.files)) {
      const fileDocs = aiOutput.files.map(f => ({
        projectId,
        fileName: f.fileName || f.path.split('/').pop(),
        filePath: f.filePath || f.path,
        content: f.content,
        fileType: f.path ? f.path.split('.').pop() : 'txt'
      }));
      await fileRepo.bulkCreate(fileDocs);
    }

    res.status(201).json({
      success: true,
      project: {
        ...project,
        _id: projectId,
        id: projectId
      },
      previewHtml: aiOutput.previewHtml
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await projectRepo.find({ userId });
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
exports.getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Verify ownership
    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to project' });
    }

    res.json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized access to project' });
    }

    const { projectName, generatedCode } = req.body;
    const updates = {};
    if (projectName) updates.projectName = projectName.trim();
    if (generatedCode !== undefined) updates.generatedCode = generatedCode;

    const updated = await projectRepo.findByIdAndUpdate(projectId, updates);

    res.json({
      success: true,
      project: updated
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await projectRepo.findByIdAndDelete(projectId);
    await messageRepo.deleteMany({ projectId });
    await fileRepo.deleteMany({ projectId });

    res.json({
      success: true,
      message: 'Project and associated resources deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/:id/chat (Iterative editing)
exports.chatAndModify = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Instruction message is required' });
    }

    const project = await projectRepo.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Save user message
    await messageRepo.create({
      projectId,
      role: 'user',
      message: message.trim()
    });

    // Get previous messages for context
    const history = await messageRepo.find({ projectId });

    // Call AI service to modify website
    const aiOutput = await aiService.modifyWebsite(project, message.trim(), history);

    // Save AI response message
    const assistantMsg = await messageRepo.create({
      projectId,
      role: 'assistant',
      message: aiOutput.explanation
    });

    // Update project code
    const updatedProject = await projectRepo.findByIdAndUpdate(projectId, {
      generatedCode: aiOutput.previewHtml
    });

    // Update files in DB
    if (aiOutput.files && Array.isArray(aiOutput.files)) {
      await fileRepo.deleteMany({ projectId });
      const fileDocs = aiOutput.files.map(f => ({
        projectId,
        fileName: f.fileName || f.path.split('/').pop(),
        filePath: f.filePath || f.path,
        content: f.content,
        fileType: f.path ? f.path.split('.').pop() : 'txt'
      }));
      await fileRepo.bulkCreate(fileDocs);
    }

    res.json({
      success: true,
      project: updatedProject,
      previewHtml: aiOutput.previewHtml,
      assistantMessage: assistantMsg
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id/messages
exports.getMessages = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const messages = await messageRepo.find({ projectId });
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/:id/download (Download project ZIP)
exports.downloadZip = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const archive = await createProjectZipStream(projectId, project.projectName);

    const safeName = (project.projectName || 'project').toLowerCase().replace(/[^a-z0-9]/g, '_');
    res.attachment(`${safeName}.zip`);
    res.setHeader('Content-Type', 'application/zip');

    archive.pipe(res);
    await archive.finalize();
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/:id/deploy
exports.deployProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    const deployResult = await deployService.deployProject(projectId, baseUrl);

    res.json({
      success: true,
      deploymentId: deployResult.deploymentId,
      deploymentUrl: deployResult.deploymentUrl,
      status: 'live',
      deployedAt: deployResult.deployedAt
    });
  } catch (error) {
    next(error);
  }
};

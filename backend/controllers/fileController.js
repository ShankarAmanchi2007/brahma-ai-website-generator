const { fileRepo, projectRepo } = require('../models/dbRepository');

// GET /api/projects/:id/files
exports.getProjectFiles = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await projectRepo.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const files = await fileRepo.find({ projectId });
    res.json({
      success: true,
      count: files.length,
      files
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id/files/:fileId
exports.getFileById = async (req, res, next) => {
  try {
    const { id: projectId, fileId } = req.params;
    const project = await projectRepo.findById(projectId);

    if (!project || project.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const file = await fileRepo.findById(fileId);
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    res.json({
      success: true,
      file
    });
  } catch (error) {
    next(error);
  }
};

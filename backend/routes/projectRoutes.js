const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/auth');

// All project routes require authentication
router.use(authMiddleware);

router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// AI Chat / Iteration
router.post('/:id/chat', projectController.chatAndModify);
router.get('/:id/messages', projectController.getMessages);

// Project Files
router.get('/:id/files', fileController.getProjectFiles);
router.get('/:id/files/:fileId', fileController.getFileById);

// Export & Deployment
router.get('/:id/download', projectController.downloadZip);
router.post('/:id/download', projectController.downloadZip);
router.post('/:id/deploy', projectController.deployProject);

module.exports = router;

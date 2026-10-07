const archiver = require('archiver');
const { fileRepo } = require('../models/dbRepository');

/**
 * Creates a zip archive stream of all files for a project
 */
async function createProjectZipStream(projectId, projectName) {
  const files = await fileRepo.find({ projectId });
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  const rootFolder = (projectName || 'ai-project').toLowerCase().replace(/[^a-z0-9]/g, '-');

  for (const file of files) {
    const cleanPath = file.filePath.replace(/\\/g, '/').replace(/^\/+/, '');
    archive.append(file.content, { name: `${rootFolder}/${cleanPath}` });
  }

  // Finalize archive in caller
  return archive;
}

module.exports = { createProjectZipStream };

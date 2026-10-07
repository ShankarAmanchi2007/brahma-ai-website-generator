const { v4: uuidv4 } = require('uuid');
const { getIsConnectedToPostgres, getPool } = require('../config/db');
const { usersStore, projectsStore, messagesStore, filesStore } = require('../database/store');

// Normalizes PostgreSQL / NeonDB row to uniform application model
function normalizeUser(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password || row.password_hash,
    password_hash: row.password_hash || row.password,
    createdAt: row.created_at || row.createdAt,
    created_at: row.created_at || row.createdAt
  };
}

function normalizeProject(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    userId: row.user_id || row.userId,
    user_id: row.user_id || row.userId,
    projectName: row.project_name || row.projectName,
    project_name: row.project_name || row.projectName,
    originalPrompt: row.original_prompt || row.originalPrompt,
    original_prompt: row.original_prompt || row.originalPrompt,
    generatedCode: row.generated_code || row.generatedCode || '',
    generated_code: row.generated_code || row.generatedCode || '',
    framework: row.framework || 'react',
    status: row.status || 'ready',
    deploymentUrl: row.deployment_url || row.deploymentUrl || '',
    deployment_url: row.deployment_url || row.deploymentUrl || '',
    deploymentId: row.deployment_id || row.deploymentId || '',
    deployment_id: row.deployment_id || row.deploymentId || '',
    deployedAt: row.deployed_at || row.deployedAt,
    createdAt: row.created_at || row.createdAt,
    created_at: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
    updated_at: row.updated_at || row.updatedAt
  };
}

function normalizeMessage(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    projectId: row.project_id || row.projectId,
    project_id: row.project_id || row.projectId,
    role: row.role,
    message: row.message,
    createdAt: row.created_at || row.createdAt,
    created_at: row.created_at || row.createdAt
  };
}

function normalizeFile(row) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    projectId: row.project_id || row.projectId,
    project_id: row.project_id || row.projectId,
    fileName: row.file_name || row.fileName,
    file_name: row.file_name || row.fileName,
    filePath: row.file_path || row.filePath,
    file_path: row.file_path || row.filePath,
    content: row.content,
    fileType: row.file_type || row.fileType || 'text',
    file_type: row.file_type || row.fileType || 'text',
    createdAt: row.created_at || row.createdAt,
    created_at: row.created_at || row.createdAt
  };
}

const userRepo = {
  async findOne(filter = {}) {
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      if (filter.email) {
        const cleanEmail = filter.email.toString().trim().toLowerCase();
        const res = await pool.query(
          'SELECT * FROM users WHERE LOWER(TRIM(email)) = $1 LIMIT 1',
          [cleanEmail]
        );
        return normalizeUser(res.rows[0]);
      }
      if (filter.id || filter._id) {
        const id = filter.id || filter._id;
        const res = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
        return normalizeUser(res.rows[0]);
      }
    }

    // Embedded store fallback with case-insensitive and whitespace-tolerant matching
    const allUsers = await usersStore.find();
    if (filter.email) {
      const target = filter.email.toString().trim().toLowerCase();
      const found = allUsers.find(u => u.email && u.email.trim().toLowerCase() === target);
      return normalizeUser(found);
    }
    if (filter.id || filter._id) {
      const id = filter.id || filter._id;
      const found = allUsers.find(u => u.id === id || u._id === id);
      return normalizeUser(found);
    }
    return null;
  },

  async findById(id) {
    return this.findOne({ id });
  },

  async create(data) {
    const id = data.id || data._id || uuidv4();
    const cleanEmail = data.email ? data.email.toString().trim().toLowerCase() : '';
    const name = data.name ? data.name.toString().trim() : 'User';
    const password = data.password || data.password_hash;

    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query(
        `INSERT INTO users (id, name, email, password, password_hash, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $4, NOW(), NOW())
         RETURNING *`,
        [id, name, cleanEmail, password]
      );
      return normalizeUser(res.rows[0]);
    }

    const created = await usersStore.create({
      _id: id,
      id,
      name,
      email: cleanEmail,
      password,
      password_hash: password
    });
    return normalizeUser(created);
  }
};

const projectRepo = {
  async find(filter = {}) {
    const userId = filter.userId || filter.user_id;

    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      let query = 'SELECT * FROM projects';
      const params = [];
      if (userId) {
        query += ' WHERE user_id = $1';
        params.push(userId);
      }
      query += ' ORDER BY updated_at DESC';
      const res = await pool.query(query, params);
      return res.rows.map(normalizeProject);
    }

    const all = await projectsStore.find();
    const filtered = userId
      ? all.filter(p => (p.userId === userId || p.user_id === userId))
      : all;
    return filtered
      .map(normalizeProject)
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  },

  async findById(id) {
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query('SELECT * FROM projects WHERE id = $1 LIMIT 1', [id]);
      return normalizeProject(res.rows[0]);
    }
    const found = await projectsStore.findById(id);
    return normalizeProject(found);
  },

  async create(data) {
    const id = data.id || data._id || uuidv4();
    const userId = data.userId || data.user_id;
    const projectName = data.projectName || data.project_name || 'Untitled';
    const originalPrompt = data.originalPrompt || data.original_prompt || '';
    const generatedCode = data.generatedCode || data.generated_code || '';
    const framework = data.framework || 'react';
    const status = data.status || 'ready';

    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query(
        `INSERT INTO projects (id, user_id, project_name, original_prompt, generated_code, framework, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
         RETURNING *`,
        [id, userId, projectName, originalPrompt, generatedCode, framework, status]
      );
      return normalizeProject(res.rows[0]);
    }

    const created = await projectsStore.create({
      _id: id,
      id,
      userId,
      user_id: userId,
      projectName,
      project_name: projectName,
      originalPrompt,
      original_prompt: originalPrompt,
      generatedCode,
      generated_code: generatedCode,
      framework,
      status
    });
    return normalizeProject(created);
  },

  async findByIdAndUpdate(id, updates) {
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const fields = [];
      const values = [];
      let idx = 1;

      if (updates.projectName || updates.project_name) {
        fields.push(`project_name = $${idx++}`);
        values.push(updates.projectName || updates.project_name);
      }
      if (updates.generatedCode !== undefined || updates.generated_code !== undefined) {
        fields.push(`generated_code = $${idx++}`);
        values.push(updates.generatedCode !== undefined ? updates.generatedCode : updates.generated_code);
      }
      if (updates.status) {
        fields.push(`status = $${idx++}`);
        values.push(updates.status);
      }
      if (updates.deploymentUrl !== undefined || updates.deployment_url !== undefined) {
        fields.push(`deployment_url = $${idx++}`);
        values.push(updates.deploymentUrl !== undefined ? updates.deploymentUrl : updates.deployment_url);
      }
      if (updates.deploymentId !== undefined || updates.deployment_id !== undefined) {
        fields.push(`deployment_id = $${idx++}`);
        values.push(updates.deploymentId !== undefined ? updates.deploymentId : updates.deployment_id);
      }
      if (updates.deployedAt || updates.deployed_at) {
        fields.push(`deployed_at = $${idx++}`);
        values.push(updates.deployedAt || updates.deployed_at);
      }

      fields.push(`updated_at = NOW()`);
      values.push(id);

      const query = `UPDATE projects SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const res = await pool.query(query, values);
      return normalizeProject(res.rows[0]);
    }

    const updated = await projectsStore.findByIdAndUpdate(id, {
      ...updates,
      projectName: updates.projectName || updates.project_name,
      generatedCode: updates.generatedCode !== undefined ? updates.generatedCode : updates.generated_code,
      deploymentUrl: updates.deploymentUrl !== undefined ? updates.deploymentUrl : updates.deployment_url,
      deploymentId: updates.deploymentId !== undefined ? updates.deploymentId : updates.deployment_id
    });
    return normalizeProject(updated);
  },

  async findByIdAndDelete(id) {
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      await pool.query('DELETE FROM projects WHERE id = $1', [id]);
      await pool.query('DELETE FROM messages WHERE project_id = $1', [id]);
      await pool.query('DELETE FROM project_files WHERE project_id = $1', [id]);
      return { id };
    }
    return await projectsStore.findByIdAndDelete(id);
  }
};

const messageRepo = {
  async find(filter = {}) {
    const projectId = filter.projectId || filter.project_id;
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query(
        'SELECT * FROM messages WHERE project_id = $1 ORDER BY created_at ASC',
        [projectId]
      );
      return res.rows.map(normalizeMessage);
    }
    const all = await messagesStore.find();
    return all
      .filter(m => m.projectId === projectId || m.project_id === projectId)
      .map(normalizeMessage)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },

  async create(data) {
    const id = data.id || data._id || uuidv4();
    const projectId = data.projectId || data.project_id;
    const role = data.role;
    const message = data.message;

    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query(
        `INSERT INTO messages (id, project_id, role, message, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         RETURNING *`,
        [id, projectId, role, message]
      );
      return normalizeMessage(res.rows[0]);
    }

    const created = await messagesStore.create({
      _id: id,
      id,
      projectId,
      project_id: projectId,
      role,
      message
    });
    return normalizeMessage(created);
  },

  async deleteMany(filter = {}) {
    const projectId = filter.projectId || filter.project_id;
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      await pool.query('DELETE FROM messages WHERE project_id = $1', [projectId]);
      return { deletedCount: 1 };
    }
    return await messagesStore.deleteMany({ projectId });
  }
};

const fileRepo = {
  async find(filter = {}) {
    const projectId = filter.projectId || filter.project_id;
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query(
        'SELECT * FROM project_files WHERE project_id = $1',
        [projectId]
      );
      return res.rows.map(normalizeFile);
    }
    const all = await filesStore.find();
    return all
      .filter(f => f.projectId === projectId || f.project_id === projectId)
      .map(normalizeFile);
  },

  async findById(id) {
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query('SELECT * FROM project_files WHERE id = $1 LIMIT 1', [id]);
      return normalizeFile(res.rows[0]);
    }
    const found = await filesStore.findById(id);
    return normalizeFile(found);
  },

  async create(data) {
    const id = data.id || data._id || uuidv4();
    const projectId = data.projectId || data.project_id;
    const fileName = data.fileName || data.file_name;
    const filePath = data.filePath || data.file_path;
    const content = data.content;
    const fileType = data.fileType || data.file_type || 'text';

    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      const res = await pool.query(
        `INSERT INTO project_files (id, project_id, file_name, file_path, content, file_type, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())
         RETURNING *`,
        [id, projectId, fileName, filePath, content, fileType]
      );
      return normalizeFile(res.rows[0]);
    }

    const created = await filesStore.create({
      _id: id,
      id,
      projectId,
      project_id: projectId,
      fileName,
      file_name: fileName,
      filePath,
      file_path: filePath,
      content,
      fileType,
      file_type: fileType
    });
    return normalizeFile(created);
  },

  async bulkCreate(filesArray) {
    const results = [];
    for (const f of filesArray) {
      results.push(await this.create(f));
    }
    return results;
  },

  async deleteMany(filter = {}) {
    const projectId = filter.projectId || filter.project_id;
    if (getIsConnectedToPostgres()) {
      const pool = getPool();
      await pool.query('DELETE FROM project_files WHERE project_id = $1', [projectId]);
      return { deletedCount: 1 };
    }
    return await filesStore.deleteMany({ projectId });
  }
};

module.exports = {
  userRepo,
  projectRepo,
  messageRepo,
  fileRepo
};

/**
 * Frontend API Service
 */
const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('brahma_token') || localStorage.getItem('webcraft_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse(response) {
  if (response.status === 401) {
    // If token invalid, purge and redirect to login state if not already there
    localStorage.removeItem('brahma_token');
    localStorage.removeItem('brahma_user');
    localStorage.removeItem('webcraft_token');
    localStorage.removeItem('webcraft_user');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Auth endpoints
  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(res);
  },

  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return handleResponse(res);
  },

  // Project CRUD
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async getProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  async createProject(prompt, projectName = '') {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ prompt, projectName })
    });
    return handleResponse(res);
  },

  async updateProject(id, updates) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return handleResponse(res);
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // AI Chat / Iteration
  async chatAndModify(id, message) {
    const res = await fetch(`${API_BASE}/projects/${id}/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message })
    });
    return handleResponse(res);
  },

  async getMessages(id) {
    const res = await fetch(`${API_BASE}/projects/${id}/messages`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Project Files
  async getFiles(id) {
    const res = await fetch(`${API_BASE}/projects/${id}/files`, {
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Deploy
  async deployProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}/deploy`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },

  // Download ZIP
  async downloadZip(id, projectName = 'project') {
    const token = localStorage.getItem('brahma_token') || localStorage.getItem('webcraft_token');
    const res = await fetch(`${API_BASE}/projects/${id}/download`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('Failed to package and download project ZIP');
    }

    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    const safeName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    a.download = `${safeName}.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  }
};

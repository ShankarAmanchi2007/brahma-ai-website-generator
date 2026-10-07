const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection(collection) {
  const file = getFilePath(collection);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error(`Error reading ${collection}:`, err);
    return [];
  }
}

function writeCollection(collection, data) {
  const file = getFilePath(collection);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

class JsonCollection {
  constructor(name) {
    this.name = name;
  }

  async find(filter = {}) {
    const items = readCollection(this.name);
    return items.filter(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] !== filter[key]) return false;
      }
      return true;
    });
  }

  async findOne(filter = {}) {
    const items = await this.find(filter);
    return items.length > 0 ? items[0] : null;
  }

  async findById(id) {
    const items = readCollection(this.name);
    return items.find(item => item._id === id || item.id === id) || null;
  }

  async create(doc) {
    const items = readCollection(this.name);
    const now = new Date().toISOString();
    const newDoc = {
      _id: uuidv4(),
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      ...doc
    };
    items.unshift(newDoc);
    writeCollection(this.name, items);
    return newDoc;
  }

  async findByIdAndUpdate(id, updates, options = {}) {
    const items = readCollection(this.name);
    const index = items.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;

    const updated = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    items[index] = updated;
    writeCollection(this.name, items);
    return updated;
  }

  async findByIdAndDelete(id) {
    const items = readCollection(this.name);
    const index = items.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    const [deleted] = items.splice(index, 1);
    writeCollection(this.name, items);
    return deleted;
  }

  async deleteMany(filter = {}) {
    let items = readCollection(this.name);
    const beforeCount = items.length;
    items = items.filter(item => {
      for (const key of Object.keys(filter)) {
        if (item[key] === filter[key]) return false;
      }
      return true;
    });
    writeCollection(this.name, items);
    return { deletedCount: beforeCount - items.length };
  }
}

module.exports = {
  usersStore: new JsonCollection('users'),
  projectsStore: new JsonCollection('projects'),
  messagesStore: new JsonCollection('messages'),
  filesStore: new JsonCollection('files')
};

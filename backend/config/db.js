/**
 * NeonDB / PostgreSQL Database Connection & Pool Manager
 */
const { Pool } = require('pg');

let pool = null;
let isConnectedToPostgres = false;

const initTables = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(255) PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      project_name VARCHAR(255) NOT NULL,
      original_prompt TEXT NOT NULL,
      generated_code TEXT,
      framework VARCHAR(50) DEFAULT 'react',
      status VARCHAR(50) DEFAULT 'ready',
      deployment_url TEXT,
      deployment_id VARCHAR(100),
      deployed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS project_files (
      id VARCHAR(255) PRIMARY KEY,
      project_id VARCHAR(255) NOT NULL,
      file_name VARCHAR(255) NOT NULL,
      file_path VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      file_type VARCHAR(50) DEFAULT 'text',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(255) PRIMARY KEY,
      project_id VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS deployments (
      id VARCHAR(255) PRIMARY KEY,
      project_id VARCHAR(255) NOT NULL,
      deployment_id VARCHAR(100) NOT NULL,
      deployment_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

const connectDB = async () => {
  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;

  if (dbUrl && (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://'))) {
    try {
      console.log('[NeonDB] Connecting to PostgreSQL / NeonDB...');
      pool = new Pool({
        connectionString: dbUrl,
        ssl: dbUrl.includes('localhost') ? false : { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
      });

      const client = await pool.connect();
      await initTables(client);
      client.release();

      isConnectedToPostgres = true;
      console.log('✓ NeonDB (PostgreSQL) connected and verified successfully!');
      return;
    } catch (err) {
      console.warn(`! NeonDB connection note: ${err.message}`);
      console.log('✓ Activating embedded PostgreSQL-compatible relational store.');
      isConnectedToPostgres = false;
    }
  } else {
    console.log('✓ DATABASE_URL not set in .env. Activating embedded PostgreSQL-compatible relational store.');
    isConnectedToPostgres = false;
  }
};

const getIsConnectedToPostgres = () => isConnectedToPostgres;
const getPool = () => pool;

module.exports = { connectDB, getIsConnectedToPostgres, getPool };

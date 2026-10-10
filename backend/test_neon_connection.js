require('dotenv').config();
const { connectDB, getIsConnectedToPostgres, getPool } = require('./config/db');

async function testConnection() {
  console.log('Testing connection to NeonDB with DATABASE_URL in backend/.env...');
  await connectDB();

  const isConnected = getIsConnectedToPostgres();
  console.log(`Connected to PostgreSQL/NeonDB: ${isConnected}`);

  if (!isConnected) {
    console.error('Failed to connect to NeonDB directly!');
    process.exit(1);
  }

  const pool = getPool();
  try {
    const timeRes = await pool.query('SELECT NOW() as current_time, version()');
    console.log('✓ Database Server Time:', timeRes.rows[0].current_time);
    console.log('✓ PostgreSQL Version:', timeRes.rows[0].version.slice(0, 50));

    // Verify all 5 tables exist
    const tablesRes = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    const tables = tablesRes.rows.map(r => r.table_name);
    console.log('✓ Created Public Tables:', tables.join(', '));

    const expected = ['users', 'projects', 'project_files', 'messages', 'deployments'];
    const allFound = expected.every(t => tables.includes(t));
    if (allFound) {
      console.log('🎉 All 5 required BRAHMA relational tables are present in NeonDB!');
      process.exit(0);
    } else {
      console.warn('⚠️ Missing tables:', expected.filter(t => !tables.includes(t)));
      process.exit(1);
    }
  } catch (err) {
    console.error('Query error:', err);
    process.exit(1);
  }
}

testConnection();

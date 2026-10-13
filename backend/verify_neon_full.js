require('dotenv').config();
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

function redactError(err) {
  if (!err) return 'Unknown error';
  const msg = err.message || err.toString();
  return msg.replace(/postgres(?:ql)?:\/\/[^:]+:[^@]+@/gi, 'postgresql://***:***@');
}

async function runVerification() {
  const results = {
    connectionTest: { passed: false, detail: null },
    tablesCheck: { passed: false, foundTables: [], missingTables: [] },
    transactionTest: { passed: false, detail: null },
    overallPassed: false
  };

  const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;

  if (!dbUrl) {
    results.connectionTest.detail = 'DATABASE_URL is not set in environment';
    console.log(JSON.stringify(results, null, 2));
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 10000,
    max: 5
  });

  let client;
  try {
    // 1. Connection Test
    client = await pool.connect();
    const pingRes = await client.query('SELECT NOW() as server_time, current_database() as db_name, version()');
    results.connectionTest.passed = true;
    results.connectionTest.detail = {
      databaseName: pingRes.rows[0].db_name,
      serverTime: pingRes.rows[0].server_time,
      pgVersion: pingRes.rows[0].version.split(' on ')[0]
    };

    // 2. Verify Required Tables
    const requiredTables = ['users', 'projects', 'project_files', 'messages', 'deployments'];
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    const foundTables = tablesRes.rows.map(r => r.table_name);
    results.tablesCheck.foundTables = foundTables;

    const missing = requiredTables.filter(t => !foundTables.includes(t));
    results.tablesCheck.missingTables = missing;
    results.tablesCheck.passed = missing.length === 0;

    // 3. Test Safe Read & Write Inside Transaction with Rollback
    const testId = `test-${uuidv4()}`;
    const testEmail = `temp.transaction.check.${Date.now()}@brahma-verify.internal`;
    
    // Count before
    const countBeforeRes = await client.query('SELECT count(*)::int as count FROM users');
    const countBefore = countBeforeRes.rows[0].count;

    await client.query('BEGIN');
    
    // Write inside transaction
    await client.query(
      `INSERT INTO users (id, name, email, password, password_hash, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [testId, 'Transaction Test User', testEmail, 'verify_password_hash', 'verify_password_hash']
    );

    // Read inside transaction
    const readInside = await client.query('SELECT id, email, name FROM users WHERE id = $1', [testId]);
    if (readInside.rows.length !== 1 || readInside.rows[0].id !== testId) {
      throw new Error('Transaction test failed: Record was not readable within transaction');
    }

    // Rollback
    await client.query('ROLLBACK');

    // Verify record no longer exists after rollback
    const readAfterRollback = await client.query('SELECT id FROM users WHERE id = $1', [testId]);
    const countAfterRes = await client.query('SELECT count(*)::int as count FROM users');
    const countAfter = countAfterRes.rows[0].count;

    if (readAfterRollback.rows.length === 0 && countAfter === countBefore) {
      results.transactionTest.passed = true;
      results.transactionTest.detail = {
        action: 'Inserted test record, read it, issued ROLLBACK',
        readVerified: true,
        rollbackVerified: true,
        countBefore,
        countAfter,
        dataMutated: false
      };
    } else {
      throw new Error(`Rollback verification failed: record still found or count changed (${countBefore} vs ${countAfter})`);
    }

    results.overallPassed = results.connectionTest.passed && results.tablesCheck.passed && results.transactionTest.passed;
  } catch (err) {
    if (client) {
      try { await client.query('ROLLBACK'); } catch (_) {}
    }
    const safeMsg = redactError(err);
    if (!results.connectionTest.passed) {
      results.connectionTest.detail = safeMsg;
    } else if (!results.transactionTest.passed) {
      results.transactionTest.detail = safeMsg;
    }
  } finally {
    if (client) client.release();
    await pool.end();
  }

  console.log(JSON.stringify(results, null, 2));
  process.exit(results.overallPassed ? 0 : 1);
}

runVerification();

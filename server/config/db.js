const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
});

const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL:', result.rows[0].now);
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
  }
};

const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
  testConnection,
};

  
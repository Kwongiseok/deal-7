const { createPool } = require('mysql2');
const path = require('path');
const {
  CREATE_CHAT_TABLE_QUERY,
  CREATE_PRODUCT_TABLE_QUERY,
  CREATE_USER_TABLE_QUERY,
} = require('./query/createTableQuery');

require('dotenv').config({ path: path.join(__dirname, '/.env') });

const createdPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

const pool = createdPool.promise();
pool.query(CREATE_USER_TABLE_QUERY);
pool.query(CREATE_PRODUCT_TABLE_QUERY);
pool.query(CREATE_CHAT_TABLE_QUERY);

module.exports = { pool };

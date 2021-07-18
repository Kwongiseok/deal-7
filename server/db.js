const mysql = require('mysql2');
const {
  CREATE_CHAT_TABLE_QUERY,
  CREATE_PRODUCT_TABLE_QUERY,
  CREATE_USER_TABLE_QUERY,
  CREATE_CHATROOM_TABLE_QUERY,
} = require('./constants/createTableQuery');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'deal',
  password: '017278tjr',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

const promisePool = pool.promise();

promisePool.query(CREATE_CHAT_TABLE_QUERY);
promisePool.query(CREATE_PRODUCT_TABLE_QUERY);
promisePool.query(CREATE_CHATROOM_TABLE_QUERY);
promisePool.query(CREATE_USER_TABLE_QUERY);

module.exports = { promisePool };

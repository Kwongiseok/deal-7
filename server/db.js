const mysql = require("mysql2");

const pool = mysql.createPool({
  // 예시
  host: "localhost",
  user: "root",
  password: "xhakxhakxh",
  database: "2ndweeksetting",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

const promisePool = pool.promise();
module.exports = { promisePool };

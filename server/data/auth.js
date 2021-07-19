const { pool } = require('../db');

async function getUserName(id) {
  return pool.execute(`SELECT name FROM USER WHERE id=?`, [id]).then((res) => res[0][0].name);
}

module.exports = {
  getUserName,
};

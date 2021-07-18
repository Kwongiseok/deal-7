const CREATE_USER_DATA_QUERY = `INSERT INTO deal.User(name, town, likes) values(?, ?, ?)`;
const FIND_USER_QUERY = `SELECT * FROM deal.User WHERE name=?`;

module.exports = {
  CREATE_USER_DATA_QUERY,
  FIND_USER_QUERY,
};

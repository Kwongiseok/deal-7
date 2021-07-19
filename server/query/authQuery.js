const CREATE_USER_DATA_QUERY = `INSERT INTO deal.User(name, town, likes) values(?, ?, ?)`;
const FIND_USER_BY_NAME_QUERY = `SELECT * FROM deal.User WHERE name=?`;
const FIND_USER_BY_ID_QUERY = `SELECT * FROM deal.User WHERE id=?`;

module.exports = {
  CREATE_USER_DATA_QUERY,
  FIND_USER_BY_NAME_QUERY,
  FIND_USER_BY_ID_QUERY,
};

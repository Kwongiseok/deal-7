const { promisePool } = require('../db.js');

('SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id');

async function getRecive() {
  return promisePool
    .execute(`SELECT `) //
    .then((result) => result[0]);
}

async function createChat(text, author, chatroomid) {
  console.log(text, author, chatroomid);
  return promisePool.execute(`INSERT INTO CHAT (text, author, chatroomid) VALUES (?,?,?)`, [text, author, chatroomid]);
}

module.exports = {
  createChat,
};

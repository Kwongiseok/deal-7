const { promisePool } = require('../db.js');

// ('SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id');

async function getReciveChatRoomInfo(chatRoomId) {
  return promisePool.execute(`SELECT * from CHATROOM WHERE id=?`, [chatRoomId]).then((result) => result[0][0]);
}

async function createChatRoom(chatRoomId, productId, seller, buyer) {
  return promisePool.execute(`INSERT INTO CHATROOM (id, productId, seller, buyer) VALUES(?,?,?,?)`, [
    chatRoomId,
    productId,
    seller,
    buyer,
  ]);
}

async function createChat(text, author, chatroomid) {
  console.log(text, author, chatroomid);
  return promisePool.execute(`INSERT INTO CHAT (text, author, createdat, chatroomid) VALUES (?,?,?)`, [
    text,
    author,
    new Date(),
    chatroomid,
  ]);
}

module.exports = {
  getReciveChatRoomInfo,
  createChat,
  createChatRoom,
};

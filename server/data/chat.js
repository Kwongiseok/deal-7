const { pool } = require('../db.js');

// ('SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id');

async function getReciveChatRoomInfo(chatroomid) {
  return pool.execute(`SELECT * from CHATROOM WHERE id=?`, [chatroomid]).then((result) => result[0][0]);
}

async function getReciveChatsFromRoom(chatroomid) {
  return pool
    .execute(`SELECT text,author FROM CHATROOM JOIN CHAT ON CHATROOM.id = CHAT.chatroomid Where CHATROOM.id=?`, [
      chatroomid,
    ])
    .then((result) => result);
}

async function getReciveChatRoomsFromProduct(productid) {
  console.log(productid);
  return pool
    .execute(
      `SELECT buyer,lastchat,lastchattime, sellerunread, thumbnail FROM PRODUCT JOIN CHATROOM ON CHATROOM.productid = PRODUCT.id WHERE PRODUCT.id=?`,
      [productid]
    )
    .then((res) => res[0]);
}

async function plusSellerUnreadCount(chatroomid) {
  return pool.execute(`UPDATE CHATROOM SET sellerunread = sellerunread+1 WHERE id =?`, [chatroomid]);
}

async function plusBuyerUnreadCount(chatroomid) {
  return pool.execute(`UPDATE CHATROOM SET sellerunread = buyerunread + 1 WHERE id =?`, [chatroomid]);
}

async function resetSellerUnreadCount(chatroomid) {
  return pool.execute(`UPDATE CHATROOM SET sellerunread = 0 WHERE id =?`, [chatroomid]);
}

async function resetBuyerUnreadCount(chatroomid) {
  return pool.execute(`UPDATE CHATROOM SET sellerunread = 0 WHERE id =?`, [chatroomid]);
}

async function createChatRoom(chatroomid, productId, seller, buyer) {
  return pool.execute(`INSERT INTO CHATROOM (id, productId, seller, buyer) VALUES(?,?,?,?)`, [
    chatroomid,
    productId,
    seller,
    buyer,
  ]);
}

async function createChat(text, author, chatroomid) {
  return pool.execute(`INSERT INTO CHAT (text, author, createdat, chatroomid) VALUES (?,?,?,?)`, [
    text,
    author,
    new Date(),
    chatroomid,
  ]);
}

module.exports = {
  getReciveChatsFromRoom,
  getReciveChatRoomInfo,
  getReciveChatRoomsFromProduct,
  plusBuyerUnreadCount,
  plusSellerUnreadCount,
  resetBuyerUnreadCount,
  resetSellerUnreadCount,
  createChat,
  createChatRoom,
};

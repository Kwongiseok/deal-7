const { pool } = require('../db.js');

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
  return pool
    .execute(
      `SELECT name,lastchat,lastchattime, sellerunread as unreadChats, thumbnail, url FROM PRODUCT JOIN CHATROOM ON CHATROOM.productid = PRODUCT.id JOIN USER ON CHATROOM.buyer = USER.id WHERE PRODUCT.id=?`,
      [productid]
    )
    .then((res) => res[0]);
}

async function getSellChatRooms(userid) {
  return pool.execute(`SELECT `);
}

async function updateLastChat(roomid, text) {
  return pool.execute(`UPDATE CHATROOM SET lastchat=?, lastchattime=?, SELLERIN=true, BUYERIN=true WHERE id=?`, [
    text,
    new Date(),
    roomid,
  ]);
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
  const url = `http://localhost:8080/chat/${productId}/${buyer}/${seller}`;
  return pool.execute(`INSERT INTO CHATROOM (id, productId, seller, buyer, url) VALUES(?,?,?,?,?)`, [
    chatroomid,
    productId,
    seller,
    buyer,
    url,
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
  updateLastChat,
};

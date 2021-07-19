const express = require('express');
const {
  getReciveChatRoomInfo,
  getReciveChatsFromRoom,
  createChatRoom,
  resetSellerUnreadCount,
  resetBuyerUnreadCount,
  getReciveChatRoomsFromProduct,
} = require('../data/chat');
const router = express.Router();

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const data = await getReciveChatRoomsFromProduct(productId);
  res.send(data);
});

router.get('/:productId/:buyerId/:sellerId', async (req, res) => {
  const { productId, buyerId, sellerId } = req.params;
  // userId를 토큰 해석을 통해서 가져온다. -> userId와 seller, buyer 비교 후 reset
  // if (req.user !== productId || req.user !== sellerId) {
  //   res.sendStatus(403);
  // }
  const user = req.user;
  const roomId = parseInt(req.params.productId + req.params.buyerId);
  const roomInfo = await getReciveChatRoomInfo(roomId);

  if (!roomInfo) {
    createChatRoom(parseInt(roomId), parseInt(productId), parseInt(sellerId), parseInt(buyerId));
  } else if (roomInfo.seller === user) {
    resetSellerUnreadCount(roomId);
  } else if (roomInfo.buyerId === user) {
    resetBuyerUnreadCount(roomId);
  }
  const data = await getReciveChatsFromRoom(roomId);
  if (data) {
    const item = data[0].map((chat) => {
      return {
        text: chat.text,
        isMine: chat.author === req.user,
      };
    });
    res.send(item);
  }
});

module.exports = router;

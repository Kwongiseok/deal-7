const express = require('express');
const { getReceiveChats } = require('../controller/chat');
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
  const data = await getReciveChatRoomsFromProduct(productId);
  res.send(data);
});

router.get('/:productId/:buyerId/:sellerId', getReceiveChats);

module.exports = router;

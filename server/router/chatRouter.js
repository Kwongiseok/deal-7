const express = require('express');
const { getReciveChatRoomInfo } = require('../data/chat');
const router = express.Router();

router.get('/:productId/:buyerId/:sellerId', async (req, res) => {
  const roomId = parseInt(req.params.productId + req.params.buyerId);
  const data = await getReciveChatRoomInfo(roomId);
  console.log('hi');
});
module.exports = router;

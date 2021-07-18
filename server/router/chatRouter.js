const express = require('express');
const { getReciveChatRoomInfo, getReciveChatsFromRoom, createChatRoom } = require('../data/chat');
const router = express.Router();

router.get('/:productId/:buyerId/:sellerId', async (req, res) => {
  const { productId, buyerId, sellerId } = req.params;
  // if (req.user !== productId || req.user !== sellerId) {
  //   res.sendStatus(403);
  // }
  const roomId = parseInt(req.params.productId + req.params.buyerId);
  const roomInfo = await getReciveChatRoomInfo(roomId);
  if (!roomInfo) {
    createChatRoom(parseInt(roomId), parseInt(productId), parseInt(sellerId), parseInt(buyerId));
  }
  const data = await getReciveChatsFromRoom(roomId);
  if (data) {
    const item = data[0].map((chat) => {
      if (chat.author === req.user) {
        return {
          text: chat.text,
          isMine: true,
        };
      } else {
        return {
          text: chat.text,
          isMine: false,
        };
      }
    });
    res.send(item);
  }
});
module.exports = router;

const { getUserName } = require('../data/auth');
const {
  getReciveChatRoomInfo,
  resetSellerUnreadCount,
  createChatRoom,
  resetBuyerUnreadCount,
  getReciveChatsFromRoom,
} = require('../data/chat');

async function renderChatDetailPage(req, res) {
  const { productId, buyerId, sellerId } = req.params;
  const roomId = parseInt(req.params.productId + req.params.buyerId);
  const roomInfo = await getReciveChatRoomInfo(roomId);

  if (!roomInfo) {
    createChatRoom(parseInt(roomId), parseInt(productId), parseInt(sellerId), parseInt(buyerId));
  }
  res.send('hi');
}

async function getReceiveChats(req, res) {
  const { productId, buyerId, sellerId } = req.params;
  // userId를 토큰 해석을 통해서 가져온다. -> userId와 seller, buyer 비교 후 reset
  if (String(req.id) !== buyerId && String(req.id) !== sellerId) {
    res.sendStatus(403);
  }
  const roomId = parseInt(productId + buyerId);
  const roomInfo = await getReciveChatRoomInfo(roomId);
  const name = await getUserName(String(req.id) === buyerId ? sellerId : buyerId);

  if (roomInfo.seller === req.id) {
    resetSellerUnreadCount(roomId);
  } else if (roomInfo.buyerId === req.id) {
    resetBuyerUnreadCount(roomId);
  }
  const data = await getReciveChatsFromRoom(roomId);
  if (data) {
    const item = data[0].map((chat) => {
      if (chat.author === req.id) {
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
    res.status(200).send({
      roomId,
      name,
      chats: item,
    });
  }
}

module.exports = {
  renderChatDetailPage,
  getReceiveChats,
};

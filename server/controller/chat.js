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
  res.send('hi');
}

async function getReceiveChats(req, res) {
  const { productId, buyerId, sellerId } = req.params;
  const user = req.user;
  // userId를 토큰 해석을 통해서 가져온다. -> userId와 seller, buyer 비교 후 reset
  // if (req.user !== productId || req.user !== sellerId) {
  //   res.sendStatus(403);
  // }
  const roomId = parseInt(req.params.productId + req.params.buyerId);
  const roomInfo = await getReciveChatRoomInfo(roomId);
  const name = await getUserName(user === buyerId ? sellerId : buyerId);

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
    res.send({
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

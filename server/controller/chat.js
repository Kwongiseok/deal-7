const { getUserName } = require('../data/auth');
const {
  getReciveChatRoomInfo,
  resetSellerUnreadCount,
  createChatRoom,
  resetBuyerUnreadCount,
  getReciveChatsFromRoom,
  deleteRoom,
  outSellerFromRoom,
  outBuyerFromRoom,
  getReciveChatRoomsFromProduct,
  getMySellingChatRooms,
  getMyBuyingChatRooms,
} = require('../data/chat');
const { getProductSeller } = require('../data/product');

async function renderChatDetailPage(req, res) {
  const { productId, buyerId, sellerId } = req.params;
  const roomId = parseInt(req.params.productId + req.params.buyerId);
  const roomInfo = await getReciveChatRoomInfo(roomId);

  if (!roomInfo) {
    createChatRoom(parseInt(roomId), parseInt(productId), parseInt(sellerId), parseInt(buyerId));
  }
  res.send('chatDetailPage');
}

async function renderChatListPageFromProduct(req, res) {
  const { productId } = req.params;
  const productSeller = await getProductSeller(productId);
  if (!productSeller) {
    res.sendStatus(404);
  }
  res.send('chatListFromProduct');
}

async function getMyAllChatRooms(req, res) {
  const sellChats = await getMySellingChatRooms(req.id);
  const buyChats = await getMyBuyingChatRooms(req.id);
  const data = [...sellChats, ...buyChats];
  data.sort((item1, item2) => {
    return item2.lastchattime.getTime() - item1.lastchattime.getTime();
  });
  res.status(200).send(data);
}

async function getChatRoomsFromProduct(req, res) {
  const { productId } = req.params;
  const productSeller = await getProductSeller(productId);
  if (!productSeller) {
    res.sendStatus(404);
  }
  if (productSeller.userId !== req.id) {
    // seller가 아닌경우
    res.sendStatus(403);
  } else {
    const data = await getReciveChatRoomsFromProduct(productId);
    data.sort((item1, item2) => {
      return item2.lastchattime.getTime() - item1.lastchattime.getTime();
    });
    res.status(200).send(data);
  }
}

async function outChatRoom(req, res) {
  const { roomId } = req.params;
  const roomInfo = await getReciveChatRoomInfo(roomId);
  if (!roomInfo) {
    res.sendStatus(404);
  }
  if (roomInfo.seller !== req.id && roomInfo.buyer !== req.id) {
    res.sendStatus(403);
  }
  if (roomInfo.seller === req.id) {
    if (!roomInfo.buyerin) {
      // buyer가 채팅방에 없을 때, 삭제
      await deleteRoom(roomId);
    } else {
      await outSellerFromRoom(roomId);
    }
  } else {
    if (!roomInfo.sellerin) {
      // seller가 채팅방에 없을 때, 삭제
      await deleteRoom(roomId);
    } else {
      await outBuyerFromRoom(roomId);
    }
  }
  res.sendStatus(200);
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
  } else if (roomInfo.buyer === req.id) {
    resetBuyerUnreadCount(roomId);
  }
  const data = await getReciveChatsFromRoom(roomId);
  if (data) {
    const item = data[0].map((chat) => {
      if (chat.author === String(req.id)) {
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
  renderChatListPageFromProduct,
  getMyAllChatRooms,
  getChatRoomsFromProduct,
  outChatRoom,
  renderChatDetailPage,
  getReceiveChats,
};

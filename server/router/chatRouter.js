const express = require('express');
const { getReceiveChats, renderChatDetailPage } = require('../controller/chat');
const {
  getReciveChatRoomsFromProduct,
  getMySellingChatRooms,
  getMyBuyingChatRooms,
  getReciveChatRoomInfo,
  outSellerFromRoom,
  outBuyerFromRoom,
  deleteRoom,
} = require('../data/chat');
const { getProductSeller } = require('../data/product');
const { checkToken } = require('../middleware/checkToken');
const router = express.Router();

// 채팅 상세화면 렌더
router.get('/:productId/:buyerId/:sellerId', renderChatDetailPage);

// 제품에 대한 채팅 목록 리스트 보여주는 화면
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const productSeller = await getProductSeller(productId);
  if (!productSeller) {
    res.sendStatus(404);
  }
  if (productSeller.userId !== req.user) {
    // seller가 아닌경우
    res.sendStatus(403);
  }
  res.render('hi');
});

// 나의 채팅 목록을 전부 가져온다.
router.get('/api/All', checkToken(), async (req, res) => {
  // Token 검증 후 req.user에 id 삽입됨
  const sellChats = await getMySellingChatRooms(req.user);
  const buyChats = await getMyBuyingChatRooms(req.user);
  const data = [...sellChats, ...buyChats];
  data.sort((item1, item2) => {
    return item1.lastchattime.getTime() - item2.lastchattime.getTime();
  });
  res.status(200).send(data);
});

// 해당 상품의 chatting 목록을 보여준다.
router.get('/api/:productId', checkToken(), async (req, res) => {
  const { productId } = req.params;
  const productSeller = await getProductSeller(productId);
  if (!productSeller) {
    res.sendStatus(404);
  }
  if (productSeller.userId !== req.user) {
    // seller가 아닌경우
    res.sendStatus(403);
  } else {
    const data = await getReciveChatRoomsFromProduct(productId);
    res.status(200).send(data);
  }
});

// 방 나갔을 때 동작
router.post('/api/out/:roomId', checkToken(), async (req, res) => {
  const { roomId } = req.params;
  req.user = 1244;
  console.log('hi');
  const roomInfo = await getReciveChatRoomInfo(roomId);
  if (!roomInfo) {
    res.sendStatus(404);
  }
  if (roomInfo.seller !== req.user && roomInfo.buyer !== req.user) {
    res.sendStatus(403);
  }
  if (roomInfo.seller === req.user) {
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
});

// 채팅방 채팅 받아오기
router.get('/api/:productId/:buyerId/:sellerId', checkToken(), getReceiveChats);

module.exports = router;

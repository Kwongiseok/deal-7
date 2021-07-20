const express = require('express');
const {
  getReceiveChats,
  renderChatDetailPage,
  outChatRoom,
  getChatRoomsFromProduct,
  getMyAllChatRooms,
  renderChatListPageFromProduct,
} = require('../controller/chat');
const { getProductSeller } = require('../data/product');
const { checkToken } = require('../middleware/checkToken');
const router = express.Router();

// 채팅 상세화면 렌더
router.get('/:productId/:buyerId/:sellerId', renderChatDetailPage);

// 제품에 대한 채팅 목록 리스트 보여주는 화면
router.get('/:productId', renderChatListPageFromProduct);

// 나의 채팅 목록을 전부 가져온다.
router.get('/api/All', checkToken(), getMyAllChatRooms);

// 해당 상품의 chatting 목록을 보여준다.
router.get('/api/:productId', checkToken(), getChatRoomsFromProduct);

// 방 나갔을 때 동작
router.post('/api/out/:roomId', checkToken(), outChatRoom);

// 채팅방 채팅 받아오기
router.get('/api/:productId/:buyerId/:sellerId', checkToken(), getReceiveChats);

module.exports = router;

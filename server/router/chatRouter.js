const express = require('express');
const { getReceiveChats, renderChatDetailPage } = require('../controller/chat');
const { getReciveChatRoomsFromProduct } = require('../data/chat');
const { getProductSeller } = require('../data/product');
const { checkToken } = require('../middleware/checkToken');
const router = express.Router();

router.get('/:productId/:buyerId/:sellerId', renderChatDetailPage);

// TODO: Token 미들웨어 추가할 예정, 채팅 목록 리스트 보여주는 화면
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

// 해당 상품의 chatting 목록을 보여준다.
router.get('/api/:productId', async (req, res) => {
  const { productId } = req.params;
  req.user = 144;
  const productSeller = await getProductSeller(productId);
  if (!productSeller) {
    res.sendStatus(404);
  }
  if (productSeller.userId !== req.user) {
    // seller가 아닌경우
    res.sendStatus(403);
  } else {
    const data = await getReciveChatRoomsFromProduct(productId);
    console.log(data);
    res.status(200).send(data);
  }
});

// 채팅방
router.get('/api/:productId/:buyerId/:sellerId', getReceiveChats);

// 나의 채팅 목록을 전부 가져온다.
router.post('/api/All', (req, res) => {
  // Token 검증 후 req.user에 id 삽입됨
  req.user = '144';
});

module.exports = router;

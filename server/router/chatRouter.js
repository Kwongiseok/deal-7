const express = require('express');
const { getReceiveChats } = require('../controller/chat');
const { getReciveChatRoomsFromProduct } = require('../data/chat');
const { getProductSeller } = require('../data/product');
const { checkToken } = require('../middleware/checkToken');
const router = express.Router();

// TODO: Token 미들웨어 추가할 예정
router.get('/:productId', async (req, res) => {
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

    res.status(200).send(data);
  }
});

router.get('/:productId/:buyerId/:sellerId', getReceiveChats);

module.exports = router;

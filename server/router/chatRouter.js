const express = require('express');
const { getReceiveChats } = require('../controller/chat');
const { getReciveChatRoomsFromProduct } = require('../data/chat');
const { getProductSeller } = require('../data/product');
const { checkToken } = require('../middleware/checkToken');
const router = express.Router();

router.get('/:productId', checkToken(), async (req, res) => {
  const { productId } = req.params;
  const productSeller = await getProductSeller(productId);
  if (productSeller !== req.user) {
    // seller가 아닌경우
    res.sendStatus(403);
  } else {
    const data = await getReciveChatRoomsFromProduct(productId);

    res.status(200).send(data);
  }
});

router.get('/:productId/:buyerId/:sellerId', getReceiveChats);

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWTKey = require('../config/jwt');
const { checkToken } = require('../middleware/checkToken');

// 로그인이 되어 있지 않은걸 클라에게 보여주기

router.get('/sale-list', checkToken(), async (req, res) => {
  try {
    res.json({ message: 'hi' });
  } catch (error) {
    console.log(`error2 : ${error}`);
    res.status(500).json({ error });
  }
});

module.exports = router;

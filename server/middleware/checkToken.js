const jwt = require('jsonwebtoken');
const JWTKey = require('../config/jwt');
const errorMessages = require('../constants/errorMessages');

/**
 * 토큰이 없거나,
 * 유효하지 않거나,
 * 만료된 토큰일 경우 에러를 보냅니다.
 */
const checkToken = () => (req, res, next) => {
  try {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) throw { message: errorMessages.NOT_RECEIVE_TOKEN };
    jwt.verify(token, JWTKey.secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ status: 'error', message: 'Authentication Error' });
      } else {
        req.user = decoded.id;
        next();
      }
    });
  } catch (error) {
    if (error.message === 'NOT_RECEIVE_TOKEN') {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ status: 'error', message: errorMessages.RECEIVE_INVALID_TOKEN });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ status: 'error', message: errorMessages.RECEIVE_EXPIRED_TOKEN });
    }

    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
  }
};

module.exports = { checkToken };

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const JWTKey = require('../config/jwt');

const { ID_REGEX } = require('../constants/regex');
const errorMessages = require('../constants/errorMessages');
const { ACCESS_TOKEN_EXPIRED_PERIOD, REFRESH_TOKEN_EXPIRED_PERIOD } = require('../constants/tokenExpiredPeriod');
const { pool } = require('../db');
const { checkToken } = require('../middleware/checkToken');
const { CREATE_USER_DATA_QUERY, FIND_USER_QUERY } = require('../query/authQuery');

/**
 * 로그인을 요청하는 API 입니다.
 * id, name을 payload로 담아 토큰을 만들어줍니다.
 */
router.post('/login', async (req, res) => {
  const { name: requestedName } = req.body;

  try {
    const [userData] = await pool.query(FIND_USER_QUERY, [requestedName]);
    if (userData.length === 0) throw { message: errorMessages.RECEIVE_NOT_EXIST_ID };

    const { id, name } = userData;
    const accessToken = jwt.sign({ id, name }, JWTKey.secret, { expiresIn: ACCESS_TOKEN_EXPIRED_PERIOD });
    const refreshToken = jwt.sign({ id, name }, JWTKey.secret, { expiresIn: REFRESH_TOKEN_EXPIRED_PERIOD });

    res.status(200).json({ status: 'success', userData, token: { accessToken, refreshToken } });
  } catch ({ message }) {
    const { RECEIVE_NOT_EXIST_ID } = error;

    if (message === RECEIVE_NOT_EXIST_ID) {
      return res.status(404).json({ status: 'error', message: RECEIVE_NOT_EXIST_ID });
    }

    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
  }
});

/**
 * 회원가입 요청입니다.
 * ID 정규식을 통과하지 못할 경우, error를 반환합니다.
 * 만약, 이미 해당 ID로 가입한 유저가 있을 경우, error를 반환합니다.
 */
router.post('/signup', async (req, res) => {
  const { name, town } = req.body;

  try {
    if (!ID_REGEX.test(name)) throw { message: errorMessages.RECEIVE_INVALID_ID };

    const [userData] = await pool.query(FIND_USER_QUERY, [name]);
    if (userData.length !== 0) throw { message: errorMessages.RECEIVE_EXISTED_ID };

    await pool.query(CREATE_USER_DATA_QUERY, [name, town, '']);
    res.status(201).json({ status: 'success', info: { name, town, likes: '[]' } });
  } catch (error) {
    const { message } = error;
    const { RECEIVE_INVALID_ID, RECEIVE_EXISTED_ID } = errorMessages;

    if ([RECEIVE_INVALID_ID, RECEIVE_EXISTED_ID].includes(message)) {
      return res.status(400).json({ status: 'error', message });
    }

    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
  }
});

/**
 * 사용자가 처음 페이지를 접속했을 때,
 * 현재 소유하고 있는 access token이 유효한지 검사합니다.
 * 만약 유효하다면, 갱신된 access token을 반환합니다.
 */
router.get('/auth-test', checkToken(), async (req, res) => {
  try {
    const accessToken = req.header('authorization').split(' ')[1];
    const { name } = jwt.decode(accessToken);
    const updatedAccessToken = jwt.sign({ name }, JWTKey.secret, { expiresIn: ACCESS_TOKEN_EXPIRED_PERIOD });

    res.status(200).json({ status: 'success', token: { accessToken: updatedAccessToken } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
  }
});

/**
 * 사용자의 refresh token이 유효한지 검사합니다.
 * 만약 유효하다면, 갱신된 access, refresh token을 반환합니다.
 */
router.get('/refresh', checkToken(), async (req, res) => {
  try {
    const refreshToken = req.header('authorization').split(' ')[1];
    const { name } = jwt.decode(refreshToken);

    const updatedAccessToken = jwt.sign({ name }, JWTKey.secret, { expiresIn: ACCESS_TOKEN_EXPIRED_PERIOD });
    const updatedRefreshToken = jwt.sign({ name }, JWTKey.secret, { expiresIn: ACCESS_TOKEN_EXPIRED_PERIOD });

    res
      .status(200)
      .json({ status: 'success', token: { accessToken: updatedAccessToken, refreshToken: updatedRefreshToken } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
  }
});

module.exports = router;

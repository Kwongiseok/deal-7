const jwt = require('jsonwebtoken');

const errorMessages = require('../constants/errorMessages');
const { MAX_LENGTH_OF_TOWN_NAME, MAX_LENGTH_OF_TOWN, MIN_LENGTH_OF_TOWN } = require('../constants/defaultTownValues');
const { pool } = require('../db');
const { GET_TOWN_VALUE_QUERY, UPDATE_TOWN_VALUE_QUERY } = require('../query/townQuery');

/**
 * 사용자의 DB에 Town을 넣어줍니다.
 * 프로세스는 다음과 같습니다.
 * 1. 현재 유저가 가지고 있는 Town이 2 이상일 경우, error.
 * 2. body 에 담겨져 있는 town이 이미 가지고 있는 Town일 경우, error.
 * 3. body 에 담겨져 있는 town의 길이가 정해진 상수보다 클 경우, error.
 * 조건을 모두 통과할 경우, DB에 새로운 town을 반영합니다.
 */
const handleCreateTown = async (req, res) => {
  try {
    const accessToken = req.header('authorization').split(' ')[1];
    const { id } = jwt.decode(accessToken);

    const [townData] = await pool.query(GET_TOWN_VALUE_QUERY, [id]);
    const currentTown = JSON.parse(townData[0].town);
    if (currentTown.length === MAX_LENGTH_OF_TOWN) throw { message: errorMessages.MAXIMUM_AMOUNT_OF_TOWN };

    const { town: newTown } = req.body;
    if (currentTown.includes(newTown)) throw { message: errorMessages.RECEIVE_EXIST_TOWN };
    if (newTown.length >= MAX_LENGTH_OF_TOWN_NAME) throw { message: errorMessages.RECEIVE_EXCEEDED_TOWN_NAME };

    currentTown.push(newTown);
    await pool.query(UPDATE_TOWN_VALUE_QUERY, [JSON.stringify(currentTown), id]);
    res.status(200).json({ status: 'reflected', currentTown });
  } catch (error) {
    const { message } = error;
    if (Object.values(errorMessages).includes(message)) {
      return res.status(400).json({ status: 'error', message });
    }

    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
    console.error(error);
  }
};

/**
 * Body로 들어온 데이터를 사용자의 DB에서 삭제합니다.
 * 프로세스는 다음과 같습니다.
 * 1. body 에 담겨져 있는 town의 길이가 정해진 상수보다 클 경우, error.
 * 2. body 에 담겨져 있는 town이 가지고 있지 않은 Town일 경우, error.
 * 2. body 에 담겨져 있는 town이 1개일 경우, error.
 * 조건을 모두 통과할 경우, DB에서 해당 데이터를 삭제합니다.
 */
const handleReviseTown = async (req, res) => {
  try {
    const accessToken = req.header('authorization').split(' ')[1];
    const { id } = jwt.decode(accessToken);

    const { town: willRemoveTown } = req.body;
    if (willRemoveTown.length >= MAX_LENGTH_OF_TOWN_NAME) throw { message: errorMessages.RECEIVE_EXCEEDED_TOWN_NAME };

    const [townData] = await pool.query(GET_TOWN_VALUE_QUERY, [id]);
    let currentTown = JSON.parse(townData[0].town);
    if (!currentTown.includes(willRemoveTown)) throw { message: errorMessages.RECEIVE_NOT_EXIST_TOWN };
    if (currentTown.length === MIN_LENGTH_OF_TOWN) throw { message: errorMessages.MINIMUM_AMOUNT_OF_TOWN };

    currentTown = currentTown.filter((town) => town !== willRemoveTown);
    await pool.query(UPDATE_TOWN_VALUE_QUERY, [JSON.stringify(currentTown), id]);
    res.status(200).json({ status: 'reflected', currentTown });
  } catch (error) {
    const { message } = error;
    if (Object.values(errorMessages).includes(message)) {
      return res.status(400).json({ status: 'error', message });
    }

    res.status(500).json({ status: 'error', message: errorMessages.UNDEFINED_SERVER_ERROR });
    console.error(error);
  }
};

module.exports = { handleCreateTown, handleReviseTown };

const router = require('express').Router();
const { handleCreateTown, handleReviseTown } = require('../controller/town');
const { checkToken } = require('../middleware/checkToken');

router.post('/', checkToken(), handleCreateTown);
router.put('/', checkToken(), handleReviseTown);

module.exports = router;

const router = require('express').Router();
const { handleLogin, handleSignup, handleAuthTest, handleRefresh } = require('../controller/auth');
const { checkToken } = require('../middleware/checkToken');

router.post('/login', handleLogin);
router.post('/signup', handleSignup);
router.get('/auth-test', checkToken(), handleAuthTest);
router.get('/refresh', checkToken(), handleRefresh);

module.exports = router;

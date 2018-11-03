const router = require('express').Router();
const user = require('../../services/user');
const auth = require('../../utils/jwtAuthenticator');

router.post('/register', user.addUser);
router.post('/login', user.login);
router.get('/user/:id', auth, user.getUser);

module.exports = router;

const router = require('express').Router();
const preference = require('../../services/preference');
const auth = require('../../utils/jwtAuthenticator');

router.post('/', auth, preference.addPreference); // Add new preference

module.exports = router;

const router = require('express').Router();
const activity = require('../../services/activity');
const auth = require('../../utils/jwtAuthenticator');

router.post('/', auth, activity.addActivity); // Add new activity

module.exports = router;

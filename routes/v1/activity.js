const router = require('express').Router();
const activity = require('../../services/activity');
const auth = require('../../utils/jwtAuthenticator');

router.post('/', auth, activity.addActivity); // Add new activity
router.get('/activity/:id', auth, activity.getActivityByID); // Get activity by ID

module.exports = router;

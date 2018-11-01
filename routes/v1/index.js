const router = require('express').Router();

const user = require('./user');
const activity = require('./activity');
const preference = require('./preference');
const itinerary = require('./itinerary');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working fine!' });
  });

router.use('/v1/user', user);
router.use('/v1/activity', activity);
router.use('/v1/preference', preference);
router.use('/v1/itinerary', itinerary);

module.exports = router;
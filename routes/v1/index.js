const router = require('express').Router();

const user = require('./user');
const activity = require('./activity');
const preference = require('./preference');
const itinerary = require('./itinerary');

const mongoUser = require('./mongo/user');
const mongoActivity = require('./mongo/activity');
//const mongoItinerary = require('./mongo/itinerary');
const mongoPreference = require('./mongo/preference');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working fine!' });
  });

// SQL
router.use('/v1/user', user);
router.use('/v1/activity', activity);
router.use('/v1/preference', preference);
router.use('/v1/itinerary', itinerary);

// MongoDB
router.use('/v1/mongo/user', mongoUser);
router.use('/v1/mongo/activity', mongoActivity);
//router.use('/v1/mongo/itinerary', mongoItinerary);
router.use('/v1/mongo/preference', mongoPreference);

module.exports = router;
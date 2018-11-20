const router = require('express').Router();
const itinerary = require('../../../services/mongo/itinerary');
const auth = require('../../../utils/jwtAuthenticator');

router.post('/', auth, itinerary.addItinerary); // Add new itinerary
router.get('/itinerary/:id', auth, itinerary.getItineraryByPreference); // Get itinerary by preference
router.get('/trips', auth, itinerary.getAllTrips); // Get all current and future trips
router.get('/triphistory', auth, itinerary.getTripHistory); // Get trip history
router.post('/sharetrip', auth, itinerary.addSharedTrip); // Add new shared trip
router.get('/sharetrip', auth, itinerary.getSharedTrips); // Get all shared trip

module.exports = router;

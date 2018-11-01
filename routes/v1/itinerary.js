const router = require('express').Router();
const itinerary = require('../../services/itinerary');
const auth = require('../../utils/jwtAuthenticator');

router.post('/', auth, itinerary.addItinerary); // Add new itinerary
router.get('/:id', auth, itinerary.getItineraryByPreference); // Get itinerary by preference

module.exports = router;

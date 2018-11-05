const router = require('express').Router();
const preference = require('../../services/preference');
const auth = require('../../utils/jwtAuthenticator');

router.post('/', auth, preference.addPreference); // Add new preference
router.get('/preference/:id', auth, preference.getPreferenceByID); // Get preference by ID
router.put('/changedate', auth, preference.changeDateByID); // Modify preference date
router.delete('/preference/:id', auth, preference.deletePreferenceByID); // Delete preference by ID

module.exports = router;

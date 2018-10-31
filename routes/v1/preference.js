const router = require('express').Router();
const preference = require('../../services/preference');
const auth = require('../../utils/jwtAuthenticator');

router.post('/', auth, preference.addPreference); // Add new preference
router.get('/:id', auth, preference.getPreferenceByID); // Get preference by ID

module.exports = router;

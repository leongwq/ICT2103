const router = require('express').Router();

const user = require('./user');
const activity = require('./activity');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working fine!' });
  });

router.use('/v1/user', user);
router.use('/v1/activity', activity);

module.exports = router;
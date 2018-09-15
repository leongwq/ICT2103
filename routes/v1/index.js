const router = require('express').Router();

const user = require('./user');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working fine!' });
  });

router.use('/v1/user', user);

module.exports = router;
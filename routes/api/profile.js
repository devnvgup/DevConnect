const express = require('express');
const router = express.Router();

// @route   GET api/Profile
router.get('/', (req, res) => res.send('Profile Routes'));


module.exports = router;
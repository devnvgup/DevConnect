const express = require('express');
const router = express.Router();

// @route   GET api/Posts
router.get('/', (req, res) => res.send('Posts Routes'));


module.exports = router;
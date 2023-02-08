const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
//  @desc     Register User
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please includes a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more character').isLength({ min: 6 }),
], async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    console.log(113113, req)
    try {
        // See if user exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })
        // encrypt password
        const salt = await bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // Return Jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }

});


module.exports = router;
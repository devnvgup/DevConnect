const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require("config");
const request = require('request');
// @route   GET api/Profile/me
// @desc   Get current users profiles
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(profile)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/Profile/me
// @desc   Create or update users profiles

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    // Build social obj
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile)
        };
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/Profile/me
// @desc   Get all Profiles

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// route   GET api/Profile/user/:user_id
// @desc   Get Profiles by User ID

router.get('/user/:user_id', async (req, res) => {
    try {
        const profiles = await Profile
            .findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);
        if (!profiles) return res.status(400)
            .json({ msg: 'There is no profile for this user' })
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400)
                .json({ msg: 'There is no profile for this user' })
        }
        res.status(500).send('Server Error');
    }
})

// route   DELETE api/Profile
// @desc   Delete profile, user & posts

router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove user posts
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// route   PUT api/Profile/experience
// @desc   Add profile experience

router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// route   DELETE api/Profile/experience/:exp_id
// @desc   Delete profile experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // @Solution 1
        // Get remove index
        // const removeIndex = profile.experience.map(item => item.id)
        //     .indexOf(req.params.exp_id)
        // profile.experience.splice(removeIndex, 1)
        // await profile.save();
        // @Solution 2
        profile.experience = profile.experience.filter(item => item.id !== req.params.exp_id)
        await profile.save();
        res.json({ msg: 'Profile deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// route   PUT api/Profile/education
// @desc   Add profile education

router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Fieldofstudy is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// route   DELETE api/Profile/education/:edu_id
// @desc   Delete profile education
router.delete('/education/:ed_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        profile.education = profile.education.filter(item => {
            return item.id !== req.params.ed_id
        });
        await profile.save();
        res.json('delete education success');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

// route   GET api/Profile/github/:username
// @desc   Get user repos from github

router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri:
                `http://api.github.com/users/${req.params.username}/repos?per_page=5&
                    sort=created:asc&client_id=${config.get('githubClientId')}&
                    client_seccret=${config.get('githubSeccret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
            host: 'api.github.com',
            path: '/users/' + req.params.username + '/repos',
        }
        await request(options, (error, response, body) => {
            console.log(113113, body)
            if (error) console.error(error);
            if (response.statusCode !== 200) return res.status(404).json({ msg: 'No GitHub Profile found' });
            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
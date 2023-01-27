const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token fron header
    const token = req.header('x-auth-token');
    // check if not token
    if (!token) return res.status(400).json({ msg: 'No token , authorization denied' });
    //verift token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
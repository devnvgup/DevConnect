const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors')
const rateLimit = require('express-rate-limit')

//Connect Database

connectDB();

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//Init Middleware

app.use(cors())

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));


//Define Routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/profile', require('./routes/api/profile.js'))
app.use('/api/posts', require('./routes/api/posts.js'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running"));
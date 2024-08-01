const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('./config/passport'); // configure passport
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
// Connect to MongoDB
mongoose.connect(process.env.DB_URI);

// Configure Session Middleware
app.use(session({
  secret: process.env.JWT_SECRET, // Use a secret from your keys file
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/logout', require('./routes/logout'));
app.use('/courses', require('./routes/courses'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/signin', require('./routes/signin'));
app.use('/edit', require('./routes/edit'));
app.use('/update-profile', require('./routes/update-profile'));
app.use('/update-skills', require('./routes/update-skills'));
app.use('*',require('./routes/error404'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('Home');
  } else {
    res.render('signin');
    // res.sendFile(path.join(__dirname, '../public', 'signin.html'));
  }
});

module.exports = router;
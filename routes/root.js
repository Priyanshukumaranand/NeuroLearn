const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.sendFile(path.join(__dirname, '../public', 'signin.html'));
  }
});

module.exports = router;
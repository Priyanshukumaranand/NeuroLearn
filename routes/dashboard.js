const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const details = req.user;
        res.render('dashboard',{details});
      } else {
        res.redirect('/signin');
      }
});

module.exports = router;
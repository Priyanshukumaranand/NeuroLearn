const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const details = req.user;
        res.render('editpage',{details});
      } else {
        res.redirect('/signin');
      }
});

module.exports = router;
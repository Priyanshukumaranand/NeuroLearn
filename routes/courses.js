const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('Courses');
});

module.exports = router;
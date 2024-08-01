const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const isAuthenticated=req.isAuthenticated()?true:false;
    res.render('Courses',{isAuthenticated});
});

module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
 const isAuthenticated=req.isAuthenticated()?true:false;
 
    res.render('Home',{isAuthenticated});
  
});

module.exports = router;
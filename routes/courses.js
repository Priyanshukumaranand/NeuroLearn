const express = require('express');

const router = express.Router();

// GET /courses/recommended
router.get('/', (req, res) => {
    // Logic to fetch recommended courses
    // ...

    // Send the recommended courses as a response
    res.send("<H1>Courses</H1>");
});

module.exports = router;
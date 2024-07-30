const express = require('express');

const router = express.Router();

// GET route for quizzes
router.get('/', (req, res) => {
    // Logic to fetch quizzes from the database or any other source
    // Replace this with your own implementation

    // Example response
    res.send("<H1>Quiz</H1>");
});

// POST route for creating a new quiz
router.post('/quizzes', (req, res) => {
    // Logic to create a new quiz
    // Replace this with your own implementation

    // Example request body
    const { title, questions } = req.body;

    // Example response
    const newQuiz = {
        id: 4,
        title: title,
        questions: questions
    };

    res.status(201).json(newQuiz);
});

module.exports = router;
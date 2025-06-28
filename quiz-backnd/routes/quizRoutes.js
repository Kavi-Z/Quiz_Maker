const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
 
router.post('/', verifyToken, authorizeRoles('teacher'), async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const quiz = new Quiz({
      title,
      description,
      questions,
      createdBy: req.user.id
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create quiz', error: err.message });
  }
});

 
router.put('/:id', verifyToken, authorizeRoles('teacher'), async (req, res) => {
  const quizId = req.params.id;
  const { title, description, questions } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this quiz' });
    }

    if (title) quiz.title = title;
    if (description) quiz.description = description;
    if (questions) quiz.questions = questions;

    await quiz.save();

    res.json({ message: 'Quiz updated successfully', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update quiz', error: err.message });
  }
});
 
router.delete('/:id', verifyToken, authorizeRoles('teacher'), async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this quiz' });
    }

    await Quiz.findByIdAndDelete(quizId);

    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete quiz', error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

 
// Create quiz
router.post('/', verifyToken, authorizeRoles('teacher'), async (req, res) => {
  try {
    const { title, description, questions } = req.body;

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



// Update  
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

// Delete  
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

// Get all quizzes to teacher
router.get('/my-quizzes', verifyToken, authorizeRoles('teacher'), async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
});
//  For students 
router.get('/all', verifyToken, authorizeRoles('student'), async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: err.message });
  }
});

//submit answers
router.post('/:id/submit', verifyToken, authorizeRoles('student'), async (req, res) => {
  const quizId = req.params.id;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (parseInt(question.correctAnswer) === parseInt(answers[index])) {
        score++;
      }
    });

    // Save the result
    const Result = require('../models/Result');
    const newResult = new Result({
      quiz: quizId,
      user: req.user.id,
      answers,
      score,
      totalQuestions: quiz.questions.length,
    });

    await newResult.save();

    res.json({
      message: 'Quiz submitted successfully',
      totalQuestions: quiz.questions.length,
      correctAnswers: score,
      scorePercent: ((score / quiz.questions.length) * 100).toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit quiz', error: err.message });
  }
});
 router.get('/:id', verifyToken, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quiz', error: err.message });
  }
});
router.get('/:id/results', verifyToken, authorizeRoles('teacher'), async (req, res) => {
  const quizId = req.params.id;
  const results = await Result.find({ quiz: quizId }).populate('user', 'name');
  res.json(results);
});

 
router.get('/my-results', verifyToken, authorizeRoles('student'), async (req, res) => {
  const userId = req.user.id;
  const results = await Result.find({ user: userId }).populate('quiz', 'title');
  res.json(results);
});


module.exports = router;

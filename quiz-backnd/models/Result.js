const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  submittedAnswers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);

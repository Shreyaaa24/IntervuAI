const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const InterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, 
    domain: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
    },
    questionsAnswered: {
    type: [String],
    default: [],
  },
  messages: [MessageSchema],
feedback: {
    type: String,
    default: '',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('Interview', InterviewSchema);
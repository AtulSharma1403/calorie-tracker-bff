const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'other']
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  bmr: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: [0, 'Calories cannot be negative']
  },
  protein: {
    type: Number,
    required: [true, 'Protein content is required'],
    min: [0, 'Protein cannot be negative']
  },
  carbs: {
    type: Number,
    required: [true, 'Carbohydrate content is required'],
    min: [0, 'Carbohydrates cannot be negative']
  },
  fat: {
    type: Number,
    required: [true, 'Fat content is required'],
    min: [0, 'Fat cannot be negative']
  },
  servingSize: {
    type: String,
    required: [true, 'Serving size is required']
  },
  foodGroup: {
    type: String,
    required: [true, 'Food category is required']
  },
  foodId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userFoodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    mealType: {
        type: String,
        required: true
    },
    foodGroup: {
        type: String,
        required: true
    },
    serving: {
        type: String,
        required: true
    },
    calorie: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = {
    Food: mongoose.model('foodmasterdata', foodSchema),
    UserFood: mongoose.model('userfooddata', userFoodSchema)
}; 
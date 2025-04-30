const User = require('../models/User');

class UserService {
  /**
   * Calculate BMR based on user details
   * @param {number} weight - Weight in kg
   * @param {number} height - Height in cm
   * @param {string} gender - Gender (male/female/other)
   * @param {number} age - Age in years
   * @returns {number} Calculated BMR
   */
  calculateBMR(weight, height, gender, age) {
    if (gender.toLowerCase() === 'male') {
      return 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age);
    } else if (gender.toLowerCase() === 'female') {
      return 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
    } else {
      // For 'other' gender, use the average of male and female formulas
      const maleBMR = 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age);
      const femaleBMR = 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
      return (maleBMR + femaleBMR) / 2;
    }
  }


  async createUser(userData) {
    const { weight, height, gender, age } = userData;
    const bmr = this.calculateBMR(weight, height, gender, age);
    
    const user = new User({
      ...userData,
      bmr: Math.round(bmr)
    });
    
    return await user.save();
  }

  /**
   * Get all users
   * @returns {Promise<Array>} Array of user objects
   */
  async getAllUsers() {
    return await User.find();
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User object
   */
  async getUserById(userId) {
    return await User.findById(userId);
  }
}

module.exports = new UserService(); 
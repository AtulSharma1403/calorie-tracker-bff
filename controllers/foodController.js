const Food = require('../models/foodModel').Food;
const UserFood = require('../models/foodModel').UserFood;
const getUniqueFoodGroups = async (req, res) => {
  try {
    const foodGroups = await Food.distinct('foodGroup');
    res.status(200).json(foodGroups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFoodsByGroup = async (req, res) => {
  try {
    const { foodGroup } = req.params;
    const foods = await Food.find({ 'foodGroup':foodGroup});
    if (foods.length === 0) {
      return res.status(404).json({ message: 'No foods found in this group' });
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUserFood = async (req, res) => {
  try {
      const { userId, foodName, mealType, foodGroup, serving, date } = req.body;
      const food = await Food.findOne({ name: foodName }).lean();
      if (!food) return res.status(404).json({ error: 'Food not found' });
      const calorie = Number(serving) * food.calories;
      const userFood = new UserFood({
          userId, foodName, mealType, foodGroup, serving, calorie, date
      });
      await userFood.save();
      res.status(201).json(userFood);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const getUserFood = async (req, res) => {
  try {
      const { userId, date } = req.query;
      const query = { userId };
      if (date) {
          const start = new Date(date);
          start.setHours(0,0,0,0);
          const end = new Date(date);
          end.setHours(23,59,59,999);
          query.date = { $gte: start, $lte: end };
      }
      const foods = await UserFood.find(query).lean();
      res.json(foods);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUniqueFoodGroups,
  getFoodsByGroup,
  addUserFood,
  getUserFood
}; 
const Activity = require('../models/Activity').Activity;
const User = require('../models/User');
const UserActivity = require('../models/Activity').UserActivity;
const UserFood = require('../models/foodModel').UserFood;

const getSpecificMotionsByActivity = async (req, res) => {
    try {
        const { activityName } = req.params;
        
        const activities = await Activity.find({
            ACTIVITY: { $regex: new RegExp(activityName, 'i') }
        });

        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: 'No activities found' });
        }

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
};

const getAllActivities = async (req, res) => {
    try {
        const uniqueActivities = await Activity.distinct('ACTIVITY');
        res.json(uniqueActivities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching unique activities', error: error.message });
    }
};

const addUserActivity = async (req, res) => {
  try {
      const { userId, activityName, activityDescription, metValue, duration, date } = req.body;
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const durationHours = Number(duration) / 60;
      const calorie = Number(metValue) * user.weight * durationHours;
      const userActivity = new UserActivity({
          userId, activityName, activityDescription, metValue, duration, calorie, date
      });
      await userActivity.save();
      res.status(201).json(userActivity);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const getUserActivity = async (req, res) => {
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
      const activities = await UserActivity.find(query).lean();
      res.json(activities);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

const getUserAllDaysSummary = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    // Get user for BMR calculation
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Fetch all foods and activities for the user at once
    const allFoods = await UserFood.find({ userId }).lean();
    const allActivities = await UserActivity.find({ userId }).lean();
    
    // If no data exists, return empty array
    if (allFoods.length === 0 && allActivities.length === 0) {
      return res.json([]);
    }

    // Group foods and activities by date
    const dateMap = new Map();
    
    // Process all foods
    allFoods.forEach(food => {
      const dateKey = new Date(food.date).toISOString().split('T')[0];
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { calorieIn: 0, calorieOut: 0, date: new Date(dateKey) });
      }
      const dayData = dateMap.get(dateKey);
      dayData.calorieIn += food.calorie;
    });
    
    // Process all activities
    allActivities.forEach(activity => {
      const dateKey = new Date(activity.date).toISOString().split('T')[0];
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { calorieIn: 0, calorieOut: 0, date: new Date(dateKey) });
      }
      const dayData = dateMap.get(dateKey);
      dayData.calorieOut += activity.calorie;
    });
    
    // Convert map to array and calculate net calories
    const summary = Array.from(dateMap.values()).map(item => {
      return {
        date: item.date,
        calorieIn: item.calorieIn,
        calorieOut: item.calorieOut,
        netCalorie: item.calorieIn - item.calorieOut - user.bmr
      };
    });
    
    // Sort by date in descending order (newest first)
    summary.sort((a, b) => b.date - a.date);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getAllActivities,
    getSpecificMotionsByActivity,
    addUserActivity,
    getUserActivity,
    getUserAllDaysSummary
}; 
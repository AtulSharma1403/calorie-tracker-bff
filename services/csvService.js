const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Food } = require('../models/foodModel');
const { Activity } = require('../models/Activity');

const importFoodData = async () => {
  const results = [];
  const filePath = path.resolve(__dirname, '../files/food-calories.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Clear existing food data
          await Food.deleteMany({});
        
          // Insert new data
          const foodData = results.map(item => ({
            name: item.name || item.Name || '',
            calories: parseFloat(item.Calories || item.calories || 0),
            protein: parseFloat(item['Protein (g)'] || item.Protein || item.protein || 0),
            carbs: parseFloat(item['Carbohydrate (g)'] || item.Carbs || item.carbohydrates || item.carbs || 0),
            fat: parseFloat(item['Fat (g)'] || item.Fat || item.fat || 0),
            servingSize: item['Serving Description 1 (g)'] || item['Serving Size'] || item.servingSize || 'N/A',
            foodGroup: item['Food Group'] || 'N/A',
            foodId: item.ID || '',
          }));
          
          await Food.insertMany(foodData);
          resolve(foodData.length);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
};

const importActivityData = async () => {
  const results = [];
  const filePath = path.resolve(__dirname, '../files/MET-values.csv');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          // Clear existing activity data
          await Activity.deleteMany({});
          
          // Insert new data
          const activityData = results.map(item => ({
            ACTIVITY: item.ACTIVITY || '',
            METs: parseFloat(item.METs || 0),
            SPECIFIC_MOTION: item['SPECIFIC MOTION'] || 'N/A',
          }));
          
          await Activity.insertMany(activityData);
          resolve(activityData.length);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
};

module.exports = {
  importFoodData,
  importActivityData
}; 
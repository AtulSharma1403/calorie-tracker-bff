const csvService = require('../services/csvService');

const importFoodData = async (req, res) => {
  try {
    const count = await csvService.importFoodData();
    res.status(200).json({
      success: true,
      message: `Successfully imported ${count} food items from CSV`,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to import food data from CSV',
      error: error.message
    });
  }
};

const importActivityData = async (req, res) => {
  try {
    const count = await csvService.importActivityData();
    res.status(200).json({
      success: true,
      message: `Successfully imported ${count} activity items from CSV`,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to import activity data from CSV',
      error: error.message
    });
  }
};

module.exports = {
  importFoodData,
  importActivityData
}; 
const express = require('express');
const router = express.Router();
const { importFoodData, importActivityData } = require('../controllers/csvController');

// Route to import food data from CSV
router.post('/import-food', importFoodData);

// Route to import activity data from CSV
router.post('/import-activity', importActivityData);

module.exports = router; 
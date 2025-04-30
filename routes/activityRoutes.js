const express = require('express');
const router = express.Router();
const {getAllActivities, getSpecificMotionsByActivity,addUserActivity,getUserActivity,getUserAllDaysSummary } = require('../controllers/activityController');

router.get('/', getAllActivities);
router.get('/summary', getUserAllDaysSummary);
router.get('/useractivity', getUserActivity);
router.get('/:activityName', getSpecificMotionsByActivity);
router.post('/useractivity', addUserActivity);

module.exports = router; 
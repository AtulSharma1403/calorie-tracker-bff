const express = require('express');
const router = express.Router();
const { getUniqueFoodGroups, getFoodsByGroup,  addUserFood,getUserFood} = require('../controllers/foodController');

router.get('/groups', getUniqueFoodGroups);
router.get('/group/:foodGroup', getFoodsByGroup);
router.post('/userfood', addUserFood);
router.get('/userfood', getUserFood);


module.exports = router; 
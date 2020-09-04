// Restaurant Routes
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getIndex);


module.exports = router;
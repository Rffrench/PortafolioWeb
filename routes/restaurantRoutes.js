// Restaurant Routes
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getIndex);

router.get('/reservations', restaurantController.getReservations);
router.get('/reservations/new', restaurantController.getNewReservation);

router.get('/orders', restaurantController.getOrders);
router.get('/orders/new', restaurantController.getNewOrder);


module.exports = router;
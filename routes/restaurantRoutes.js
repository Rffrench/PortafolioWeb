// Restaurant Routes
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getIndex);

// VISTAS RESERVAS
router.get('/reservations', restaurantController.getReservationsMenu);
router.get('/reservations/new', restaurantController.getNewReservation);
router.get('/reservations/cancel', restaurantController.getCancelReservation);
// ENDPOINTS RESERVAS
router.post('/reservations', restaurantController.postReservation);
router.post('/reservations/cancel', restaurantController.deleteReservation);

router.get('/orders', restaurantController.getOrdersMenu);
router.get('/orders/new', restaurantController.getNewOrder);


module.exports = router;
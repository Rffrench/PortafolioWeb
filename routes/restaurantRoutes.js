// Restaurant Routes
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getIndex);

// ENDPOINTS RESERVAS
router.get('/reservations', restaurantController.getReservationsMenu);
router.post('/reservations', restaurantController.postReservation);

router.get('/reservations/new', restaurantController.getNewReservation);

router.get('/reservations/cancel', restaurantController.getCancelReservation);
router.delete('/reservations/cancel', restaurantController.deleteReservation); // DELETE funciona gracias a method-override


// ENDPOINTS ORDERS
router.get('/orders', restaurantController.getOrdersMenu);
router.get('/orders/new', restaurantController.getNewOrder);
router.post('/orders', restaurantController.postOrder);


module.exports = router;
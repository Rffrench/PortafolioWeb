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
router.get('/orders/:userId/payments', restaurantController.getPayOrder);
router.put('/orders/:userId', restaurantController.putOrderExtra);
router.post('/orders/:userId/payments', restaurantController.postPayOrder);
router.post('/orders', restaurantController.postOrder);



router.get('/orders/payment-confirmed', restaurantController.getPaymentConfirmed);



module.exports = router;
// Restaurant Routes
const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');



router.get('/income', financeController.getIncomesView);
router.get('/income/report', financeController.getIncomeReport);
router.get('/checkout', financeController.getCheckoutView);
router.get('/getCheckouts', financeController.getCheckouts);

module.exports = router;
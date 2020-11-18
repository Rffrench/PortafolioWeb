// Restaurant Routes
const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');



router.get('/income', financeController.getIncomesView);
router.get('/income/report', financeController.getIncomeReport);

module.exports = router;
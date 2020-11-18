// Restaurant Routes
const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');



router.get('/incomes', financeController.getIncomesView);
router.get('/incomes/report', financeController.getIncomeReport);

module.exports = router;
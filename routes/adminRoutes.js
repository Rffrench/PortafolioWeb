// Restaurant Routes
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// ENDPOINTS MESERO (modulo administracion)
router.get('/tables', adminController.getTablesView);
//router.put('/tables/:tableId', adminController.putTables); // PUT funciona gracias a method-override


module.exports = router;
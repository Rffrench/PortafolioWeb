// Restaurant Routes
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// ENDPOINTS MESERO (modulo administracion)
router.get('/tables', adminController.getTablesView);
//router.put('/tables/:tableId', adminController.putTables); // PUT funciona gracias a method-override

router.get('/products', adminController.getProductsMenu);
router.get('/product/list', adminController.getProductList);
router.post('/product/update', adminController.putProductView);
router.post('/products', adminController.putProduct);


router.get('/recipes', adminController.getRecipesMenu);
router.get('/recipes/new', adminController.getNewRecipe);
router.post('/recipes',adminController.postRecipe);
module.exports = router;
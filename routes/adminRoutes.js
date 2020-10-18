// Restaurant Routes
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// ENDPOINTS MESERO (modulo administracion)
router.get('/tables', adminController.getTablesView);
//router.put('/tables/:tableId', adminController.putTables); // PUT funciona gracias a method-override


router.post('/order-products/update',adminController.getAddOrderProductView);
router.post('/order-products/add',adminController.postOrderProduct);
router.get('/order-products-test',adminController.getOrderProductsTestView);
router.post('/order-products',adminController.getOrderProductsView);
router.get('/order-products',adminController.getOrderProductsView);
router.post('/order-products/status',adminController.putOrderStatus);
router.post('/order-products/delete',adminController.deleteOrderProduct);

router.get('/inventoryOrder/form', adminController.getInventoryOrderForm);
router.get('/inventory-orders', adminController.getInventoryOrders);
router.post('/inventory-order',adminController.postInventoryOrder);


router.get('/productsMenu', adminController.getProductsMenu);
router.get('/product/list', adminController.getProductList);
router.post('/product/update', adminController.putProductView);
router.post('/products', adminController.putProduct);



router.get('/recipes', adminController.getRecipesMenu);
router.get('/recipes/new', adminController.getNewRecipe);
router.post('/recipes',adminController.postRecipe);
module.exports = router;
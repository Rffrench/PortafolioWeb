// Restaurant Routes
const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');



router.put('/inventory-orders/products', warehouseController.putOrderProduct);
router.post('/inventory-orders/products/update', warehouseController.getupdateQuantityView);
router.post('/inventory-orders/products', warehouseController.postOrderProduct);
router.get('/inventory-orders/products/:orderId', warehouseController.getOrderProductsView);
router.put('/inventory-orders', warehouseController.putOrderStatus);
router.delete('/inventory-orders/products', warehouseController.deleteOrderProduct);
router.get('/inventory-orders/new', warehouseController.getInventoryOrderForm);
router.get('/inventory-orders/:userId', warehouseController.getInventoryOrders);
router.post('/inventory-orders', warehouseController.postInventoryOrder);


router.get('/products', warehouseController.getProductsMenu);
router.get('/products/list', warehouseController.getProductList);
router.post('/products/update', warehouseController.getProductUpdateView);
router.put('/products', warehouseController.putProduct);



router.get('/recipes', warehouseController.getRecipesMenu);
router.get('/recipes/new', warehouseController.getNewRecipe);
router.post('/recipes/new', warehouseController.postRecipe);
module.exports = router;
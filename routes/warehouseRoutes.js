// Restaurant Routes
const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');



router.post('/order-products/update-quantity',warehouseController.putOrderProduct);
router.post('/order-products/update',warehouseController.getupdateQuantityView);
router.post('/order-products/new',warehouseController.postOrderProduct);
router.get('/order-products/:order',warehouseController.getOrderProductsView);
router.post('/order-products/:order',warehouseController.getOrderProductsView);
router.post('/update-status',warehouseController.putOrderStatus);
router.post('/order-products',warehouseController.deleteOrderProduct);

router.get('/inventoryOrder/form', warehouseController.getInventoryOrderForm);
router.get('/inventory-orders/:user', warehouseController.getInventoryOrders);
router.post('/inventory-order',warehouseController.postInventoryOrder);


router.get('/productsMenu', warehouseController.getProductsMenu);
router.get('/product/list', warehouseController.getProductList);
router.post('/product/update', warehouseController.putProductView);
router.post('/products', warehouseController.putProduct);



router.get('/recipes', warehouseController.getRecipesMenu);
router.get('/recipes/new', warehouseController.getNewRecipe);
router.post('/recipes',warehouseController.postRecipe);
module.exports = router;
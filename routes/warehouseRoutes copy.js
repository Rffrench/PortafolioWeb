// Restaurant Routes
const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouseController');


// Todos estos deberian ser /inventory-orders/products en vez de q se llamen solo order-products
router.post('/order-products/update-quantity', warehouseController.putOrderProduct); // sacar el update-quantity y que sea solo el PUT a la ruta
router.get('/order-products/update', warehouseController.getupdateQuantityView); // ojala como GET y pasarle los params en la URL
router.post('/order-products/new', warehouseController.postOrderProduct); // sacarle el new, /inventory-orders/products nomas
router.get('/order-products/:order', warehouseController.getOrderProductsView);
router.post('/order-products/:order', warehouseController.getOrderProductsView); // hay 2 pa lo mismo??
router.post('/update-status', warehouseController.putOrderStatus); // REST funciona con recursos, esto habria que cambiarlo, si se modifica la orden por ej o un campo de esta el PUT iria igual a /inventory-orders aunq sea el status nomas. Cambiar a PUT
router.post('/order-products', warehouseController.deleteOrderProduct); // cambiar a DELETE



router.get('/inventoryOrder/form', warehouseController.getInventoryOrderForm); // nom distinto, puede ser /inventory-orders/new o tan solo /orders (como son rutas de bodega igual llevan el /warehouse antes, sino el inventory-orders queda bkn igual)
router.get('/inventory-orders/:user', warehouseController.getInventoryOrders); // nom distinto? userId falto ?
router.post('/inventory-order', warehouseController.postInventoryOrder); // noms distintos??


router.get('/productsMenu', warehouseController.getProductsMenu); //El menu podria ser /products
router.get('/product/list', warehouseController.getProductList); // products/list
router.post('/product/update', warehouseController.putProductView); // productView es una vista, no puede ser PUT ni tampoco que el metodo se llame asi, podria ser getProductUpdateView??. La url Puede ser /products/update pero que sea un GET y que los datos se le pasen por la URL como parametros ?p1=xx&p2=yy.
router.post('/products', warehouseController.putProduct); // cambiar a put. En el form agregar <input type="hidden" name="_method" id="_method" value="put">



router.get('/recipes', warehouseController.getRecipesMenu);
router.get('/recipes/new', warehouseController.getNewRecipe);
router.post('/recipes', warehouseController.postRecipe); // /recipes/new
module.exports = router;
// Controlador administración
const axios = require('axios');
const sendErrors = require('../util/errorFunctions'); // Funcion para info de errores comunes al acceder a pags sin estar autorizado
const helperFunctions = require('../util/helperFunctions');
const Product = require('../models/productModel');

//probando
exports.getOrderProductsView = (req, res, next) => {
    //const token = localStorage.getItem('token') || null;    
    const token = req.cookies.jwt;
    const orderId = req.params.orderId;
    axios.all([
        axios.get(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders/products/${orderId}`,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }),
        axios.get(`${process.env.ORCHESTRATOR}/admin/products`,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }),
        axios.get(`${process.env.ORCHESTRATOR}/warehouse/inventory-order/${orderId}`,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
    ])
        .then(axios.spread((orderProducts, products, inventoryOrder) => {
            console.log(inventoryOrder.data);
            res.render('warehouse/order-products', { pageTitle: 'Productos de orden', path: '/admin/products', successMessage: null, errorMessage: null, orderProducts: orderProducts.data.OrderProducts, products: products.data.products, inventoryOrder: inventoryOrder.data.inventoryOrder, order: orderId });

        }))
        .catch((err) => {

            sendErrors(err.response, res);

            return;
        });
}




// Order Products
exports.putOrderProduct = (req, res, next) => {

    const order = req.body.order;
    const product = req.body.product;
    const quantity = req.body.quantity;
    axios.put(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders/products`,
        {
            order: order,
            product: product,
            quantity: quantity
        })
        .then(response => {
            res.redirect(`/warehouse/inventory-orders/products/${order}`);
        })
        .catch(err => {
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.redirect('back');
            return;
        })


}


exports.postOrderProduct = (req, res, next) => {
    const order = req.body.order;
    const product = req.body.product;
    const quantity = req.body.quantity;
    console.dir(req.body);



    axios.post(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders/products`,
        {
            order: order,
            product: product,
            quantity: quantity
        })
        .then(response => {
            console.log(response.data);
            res.redirect('back');
        })
        .catch(err => {
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.redirect('back');
            return;
        })
}


exports.getupdateQuantityView = (req, res, next) => {
    const token = req.cookies.jwt;
    const [order, productId, product, quantity] = [req.body.order, req.body.productId, req.body.product, req.body.quantity];


    axios.get(`${process.env.ORCHESTRATOR}/admin/products`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/add-product-order', { pageTitle: 'Insumos', path: '/admin/products', successMessage: null, order, product, productId, quantity, errorMessage: null });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}


exports.getOrderProductsTestView = (req, res, next) => {
    const token = req.cookies.jwt;
    const inventoryOrder = {
        order: req.query.order,
        description: req.query.description,
        statusId: req.query.statusId,
        status: req.query.status
    }
    const order = req.query.order;
    const orderObj = req.query.orderObj;
    axios.all([
        axios.get(`${process.env.ORCHESTRATOR}/warehouse/order-products/${order}`,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            }),
        axios.get(`${process.env.ORCHESTRATOR}/warehouse/products`,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
    ])
        .then(axios.spread((orderProducts, products) => {
            res.render('warehouse/order-products-test', { pageTitle: 'Productos de orden', path: '/admin/products', successMessage: null, errorMessage: null, orderProducts: orderProducts.data.OrderProducts, products: products.data.products, order });

        }))
        .catch((errors) => {
            console.log(errors);
            res.render('warehouse/order-products-test', { pageTitle: 'Productos de orden', path: '/admin/products', successMessage: null, errorMessage: null, orderProducts: null, order });
        });
}

exports.deleteOrderProduct = (req, res, next) => {
    const order = req.body.order;
    const product = req.body.product;

    console.dir(req.body);
    console.log('Se va a eliminar el producto de la orden');



    axios.delete(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders/products/${order}/${product}`)
        .then(response => {
            console.log(response.data);

            res.redirect(`/warehouse/inventory-orders/products/${order}`)

        })
        .catch(err => {
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.redirect(`/warehouse/inventory-orders/products/${order}`)
            return;
        })
}

exports.putOrderStatus = (req, res, next) => {
    const orderId = req.body.orderId;

    axios.put(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders`,
        {
            orderId: orderId
        }

    )
        .then(response => {
            console.log(response.data);
            res.redirect(`/warehouse/inventory-orders/products/${orderId}`);
        })
        .catch(err => {
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.redirect(`/warehouse/order-products/${orderId}`);
            return;
        })
}










// Vistas Products
exports.getProductsMenu = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/warehouse/products/menu`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/product-info', { pageTitle: 'Insumos', path: '/admin/products', successMessage: null, errorMessage: null });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}

exports.getInventoryOrderForm = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders/new`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/new-inventory-order', { pageTitle: 'Ordne de inventario', path: '/admin/products', successMessage: null, errorMessage: null, products: response.data.products });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}

exports.postInventoryOrder = (req, res, next) => {
    const [warehouseId, description] = [req.body.userId, req.body.description];

    axios.post(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders`,
        {
            warehouseId: warehouseId,
            description: description
        }).then(response => {
            const order = response.data.result[0]['last_insert_id()'];
            res.redirect(`/warehouse/inventory-orders/products/${order}`);
        })
        .catch(err => {
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.redirect('/warehouse/inventory-orders');
            return;
        })
}


exports.getInventoryOrders = (req, res, next) => {
    const token = req.cookies.jwt;
    const userId = req.params.userId;

    axios.get(`${process.env.ORCHESTRATOR}/warehouse/inventory-orders/${userId}`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            res.render('warehouse/inventory-orders', { pageTitle: 'Ordenes de inventario', path: '/admin/products', successMessage: null, errorMessage: null, orders: response.data.inventoryOrders });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;
        })
}



exports.getProductList = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/warehouse/products`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/products', { pageTitle: 'Insumos', path: '/admin/products', successMessage: null, errorMessage: null, products: response.data.products });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}

exports.getProductUpdateView = (req, res, next) => {
    const token = req.cookies.jwt;

    const product = new Product(req.body.productId, req.body.name, req.body.quantity);

    axios.get(`${process.env.ORCHESTRATOR}/admin/products`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/update-product', { pageTitle: 'Actualizar producto', path: '/admin/product', errorMessage: null, product })
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}


exports.putProduct = (req, res, next) => {
    const [productId, name, quantity] = [req.body.productId, req.body.name, req.body.quantity];

    axios.put(`${process.env.ORCHESTRATOR}/admin/products/${productId}`,
        {
            name: name,
            quantity: quantity
        }).then(response => {
            console.log(response.data);
            res.render('warehouse/product-info', { pageTitle: 'Products', path: '/admin/products', errorMessage: errorMessage, successMessage: null })
        })
        .catch(err => {
            //res.redirect('/reservations/new');


            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.render('warehouse/product-info', { pageTitle: 'Products', path: '/admin/products', errorMessage: errorMessage, successMessage: `El stock de ${name} se ha actualizado a: ${quantity}` });
            return;
        })
}


// VISTAS Recetas
exports.getRecipesMenu = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/warehouse/recipes/menu`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/recipes', { pageTitle: 'Recetas', path: '/admin/recipes', successMessage: null })
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}


exports.getNewRecipe = (req, res, next) => {
    const token = req.cookies.jwt;

    axios.get(`${process.env.ORCHESTRATOR}/warehouse/recipes/new`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/new-recipe', { pageTitle: 'Nueva Receta', path: '/admin/recipes', errorMessage: null })
        })
        .catch(err => {
            sendErrors(err.response, res);
            return;

        })
}

exports.postRecipe = (req, res, next) => {
    const [name, description, cookingTime, userId] = [req.body.name, req.body.description, req.body.cookingTime, req.body.userId];

    axios.post(`${process.env.ORCHESTRATOR}/warehouse/recipes`,
        {
            name: name,
            description: description,
            cookingTime: cookingTime,
            userId: userId
        }).then(response => {
            console.log(response.data);
            res.render('warehouse/recipes', { pageTitle: 'Recipes', path: '/admin/recipes', successMessage: `La receta ${name} ha sido creada con exito.` })
        })
        .catch(err => {
            //res.redirect('/reservations/new');


            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;
            let errorMessage;

            switch (errorStatus) {
                case 409:
                    errorMessage = '';
                    break;

                default:
                    errorMessage = 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde';
                    break;
            }

            res.render('warehouse/new-recipe', { pageTitle: 'Nueva Receta', path: '/recipes/new', errorMessage: errorMessage });
            return;
        })
}

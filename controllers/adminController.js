// Controlador administración
const axios = require('axios');
const sendErrors = require('../util/errorFunctions'); // Funcion para info de errores comunes al acceder a pags sin estar autorizado
const helperFunctions = require('../util/helperFunctions');
const Product = require('../models/productModel');

exports.getTablesView = (req, res, next) => {
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/tables`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            res.render('admin/tables-management', { pageTitle: 'Administrar Mesas', path: '/tables', errorMessage: JSON.stringify(response.data.tables) });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return; // return para que no continue. no es necesario aca eso si
        })
}


// Vistas Products
exports.getProductsMenu = (req, res, next) => {   
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/products`,
        {
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/product-info', { pageTitle: 'Insumos', path: '/admin/products', successMessage: null, errorMessage: null, products:response.data.products });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return; 

        })
}

exports.getInventoryOrderForm = (req, res, next) => {   
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/products`,
        {
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/new-inventory-order', { pageTitle: 'Ordne de inventario', path: '/admin/products', successMessage: null, errorMessage: null, products:response.data.products });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return; 

        })
}

exports.postInventoryOrder = (req, res, next) => {
    const [warehouseId, description] = [req.body.userId, req.body.description];
   
    axios.post(`${process.env.ORCHESTRATOR}/admin/inventoryOrders`,
    {
        warehouseId: warehouseId,
        description: description        
    }).then(response=> {
        console.log(response.data);
        res.render('warehouse/product-info', { pageTitle: 'Products', path: '/admin/products',errorMessage: errorMessage, successMessage: null})
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

        res.render('warehouse/product-info', { pageTitle: 'Products', path: '/admin/products', errorMessage: errorMessage, successMessage:`Se ha creaedo la orden de inventario exitosamente.` });
        return;
    })
}


exports.getInventoryOrders = (req, res, next) => {   
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/inventoryOrders`,
        {
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/inventory-orders', { pageTitle: 'Ordenes de inventario', path: '/admin/products', successMessage: null, errorMessage: null, orders:response.data.inventoryOrders});
        })
        .catch(err => {
            sendErrors(err.response, res);
            return; 

        })
}



exports.getProductList = (req, res, next) => {   
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/products`,
        {
            headers: { 'Authorization': 'Bearer ' + token } 
        })
        .then(response => {
            console.log(response.data);
            res.render('warehouse/products', { pageTitle: 'Insumos', path: '/admin/products', successMessage: null, errorMessage: null, products:response.data.products });
        })
        .catch(err => {
            sendErrors(err.response, res);
            return; 

        })
}

exports.putProductView = (req, res, next) => {   
    const token = localStorage.getItem('token') || null;

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
    }).then(response=> {
        console.log(response.data);
        res.render('warehouse/product-info', { pageTitle: 'Products', path: '/admin/products',errorMessage: errorMessage, successMessage: null})
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

        res.render('warehouse/product-info', { pageTitle: 'Products', path: '/admin/products', errorMessage: errorMessage, successMessage:`El stock de ${name} se ha actualizado a: ${quantity}` });
        return;
    })
}


// VISTAS Recetas
exports.getRecipesMenu = (req, res, next) => {   
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/recipes/menu`,
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
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/admin/recipes/new`,
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
    
    axios.post(`${process.env.ORCHESTRATOR}/admin/recipes`,
    {
        name: name,
        description: description,
        cookingTime: cookingTime,
        userId: userId
    }).then(response=> {
        console.log(response.data);
        res.render('warehouse/recipes', { pageTitle: 'Recipes', path: '/admin/recipes', successMessage: `La receta ${name} ha sido creada con exito.`})
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

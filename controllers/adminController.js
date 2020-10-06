// Controlador administración
const axios = require('axios');
const sendErrors = require('../util/errorFunctions'); // Funcion para info de errores comunes al acceder a pags sin estar autorizado
const helperFunctions = require('../util/helperFunctions');

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
        res.render('warehouse/recipes', { pageTitle: 'Recipes', path: '/admin/recipes', successMessage: 'La receta ha sido creada c:'})
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

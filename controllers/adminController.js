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


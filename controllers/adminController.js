// Controlador administración
const axios = require('axios');
const getErrorInfo = require('../util/errorInfo'); // Funcion para info de errores comunes al acceder a pags sin estar autorizado
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
            const [errorCode, errorMessage] = getErrorInfo(err.response.status);
            res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
            return;
        })
}

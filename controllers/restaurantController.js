// Controlador restaurante
const axios = require('axios');
const getErrorInfo = require('../util/errorInfo'); // Funcion para info de errores comunes al acceder a pags sin estar autorizado


exports.getIndex = (req, res, next) => {
    res.render('index', { pageTitle: 'Restaurante Siglo XXI', path: '/' });
}

exports.getReservations = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/reservations`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            res.render('restaurant/reservations', { pageTitle: 'Reservations', path: '/reservations' })
        })
        .catch(err => {
            const [errorCode, errorMessage] = getErrorInfo(err.response.status);
            res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
            return;
        })
}

exports.getNewReservation = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/reservations/new`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            // Si el token estaba bien se puede acceder a la pag
            console.log(response.data);
            res.render('restaurant/new-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/new' })
        })
        .catch(err => {
            const [errorCode, errorMessage] = getErrorInfo(err.response.status); // Se devuelve array
            res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
            return; // return para que no continue

        })
}




// Orders

exports.getOrders = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/orders`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            res.render('restaurant/orders', { pageTitle: 'Órdenes', path: '/orders' })
        })
        .catch(err => {
            const [errorCode, errorMessage] = getErrorInfo(err.response.status);
            res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
            return;
        })
}

exports.getNewOrder = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/orders/new`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            res.render('restaurant/new-order', { pageTitle: 'Órdenes', path: '/orders/new' })
        })
        .catch(err => {
            const [errorCode, errorMessage] = getErrorInfo(err.response.status);
            res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
            return;
        })
}
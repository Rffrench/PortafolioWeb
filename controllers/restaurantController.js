// Controlador restaurante
const axios = require('axios');
const getErrorInfo = require('../util/errorInfo'); // Funcion para info de errores comunes al acceder a pags sin estar autorizado
const Reservation = require('../models/reservationsModel');
const helperFunctions = require('../util/helperFunctions');

exports.getIndex = (req, res, next) => {
    res.render('index', { pageTitle: 'Restaurante Siglo XXI', path: '/' });
}


// VISTAS RESERVAS
exports.getReservationsMenu = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/reservations/menu`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            res.render('restaurant/reservations', { pageTitle: 'Reservations', path: '/reservations', successMessage: null })
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
            res.render('restaurant/new-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/new', errorMessage: null })
        })
        .catch(err => {
            const [errorCode, errorMessage] = getErrorInfo(err.response.status); // Se devuelve array
            res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
            return; // return para que no continue

        })
}


exports.getCancelReservation = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;


    axios.get(`${process.env.ORCHESTRATOR}/reservations/cancel`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            // Si el token estaba bien se puede acceder a la pag

            // Creando fecha para el manejo correcto de estas
            const reservationDate = response.data.reservations[0].reservationDate;
            const [year, month, day] = [...reservationDate.split('-')]
            const monthIndex = month - 1 // remember that Date's contructor 2nd param is monthIndex (0-11) not month number (1-12)!
            const reservationDateJS = new Date(year, monthIndex, day)
            console.log(reservationDateJS);


            const options = {
                year: '2-digit', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                timeZone: 'America/Santiago',
                timeZoneName: 'short'
            }
            const formatter = new Intl.DateTimeFormat('es-cl', options)
            const date = formatter.format(reservationDateJS);
            console.log(date);

            //console.log(reservationDate.replace(/-/g, '/'));
            res.render('restaurant/cancel-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/cancel', reservationData: response.data.reservations[0] }) // si se encuentran reservas se pasa como dato la info. Viene un array dentor del JSON
        })
        .catch(err => {
            if (err.response.status != 404) { // si el error es distinto a 404 significa que no está logueado o ocurrio otro error desconocido
                const [errorCode, errorMessage] = getErrorInfo(err.response.status); // Se devuelve array
                res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
                return; // return para que no continue
            } else {
                res.render('restaurant/cancel-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/cancel', reservationData: null }) // si es 404 se pasa nulo como info de reserva
                return;
            }


        })
}

// RESERVAS
exports.postReservation = (req, res, next) => {
    const reservation = new Reservation(req.body.reservationDate, req.body.reservationTime, req.body.party, req.body.userId);
    const today = helperFunctions.getToday(); // funcion de ayuda importada para obtener el dia de hoy

    // Verificar que la fecha introducida no sea anterior a hoy
    if (today > reservation.reservationDate) {
        res.render('restaurant/new-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/new', errorMessage: 'Fecha ingresada menor al día de hoy' });
        return;
    }

    // Se envia POST al orchestador para que maneje las peticiones a los microservicios
    axios.post(`${process.env.ORCHESTRATOR}/reservations`, reservation)
        .then(response => {
            console.log(response.data);
            res.render('restaurant/reservations', { pageTitle: 'Reservations', path: '/reservations', successMessage: 'Su reserva ha sido CREADA! Nos vemos pronto :)' })
        })
        .catch(err => {
            console.log(err.response.status);
            //res.redirect('/reservations/new');

            // Si se recibe un 409, significa que ya existe la reserva, sino se cayo el server o otro error
            const httpCode = err.response.status;
            if (httpCode === 409) {
                res.render('restaurant/new-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/new', errorMessage: 'Ya existe una reserva agendada' });
                return;
            } else {
                res.render('restaurant/new-reservation', { pageTitle: 'Nueva Reserva', path: '/reservations/new', errorMessage: 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde' });
                return;
            }
        })
}

exports.deleteReservation = (req, res, next) => {
    const userId = req.body.userId;

    axios.delete(`${process.env.ORCHESTRATOR}/reservations/${userId}`)
        .then(response => {
            res.render('restaurant/reservations', { pageTitle: 'Reservations', path: '/reservations', successMessage: 'Su reserva al restaurante ha sido CANCELADA.' })
        })
        .catch(err => {
            console.log(err);
            res.redirect('/reservations/cancel');
        })
}




// Orders

exports.getOrdersMenu = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/orders/menu`,
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
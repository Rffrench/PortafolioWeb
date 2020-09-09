// Controlador restaurante
const axios = require('axios');

exports.getIndex = (req, res, next) => {
    res.render('index', { pageTitle: 'Restaurante Siglo XXI', path: '/' });
}

exports.getNewOrder = (req, res, next) => {
    // Para ver si el usuario está logueado o el token está correcto se le pregunta al orquestador. Se manda el Authorization header con el Bearer token
    const token = localStorage.getItem('token') || null;

    axios.get(`${process.env.ORCHESTRATOR}/new-order`,
        {
            headers: { 'Authorization': 'Bearer ' + token } // Se envian en los headers el token!
        })
        .then(response => {
            // Si el token estaba bien se puede acceder a la pag
            console.log(response.data);
            res.render('restaurant/new-order', { pageTitle: 'Nueva Orden', path: '/new-order' })
        })
        .catch(err => {
            console.log(err.response.status); // err.response para acceder al codigo de error

            // TODO: Refactorizar esto
            let errorCode = err.response.status;
            let errorMessage = '';
            if (errorCode == 403) { // se ven los codigos de errores, dependiendo el codigo se identifica el problema
                errorMessage = 'No está autorizado para acceder a esta página';
            } else {
                errorMessage = 'No ha iniciado sesión para acceder a esta página o ha ocurrido un error de servidor';
            }
            res.send(`
        <h1>Error ${errorCode}, ${errorMessage} </h1>
        <a href="/">Volver al Inicio</a>
        `);
            return; // return para que no continue

        })
}
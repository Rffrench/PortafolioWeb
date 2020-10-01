// Controlador para Autenticación

const User = require('../models/userModel');
const axios = require('axios');
const qs = require('qs');


exports.postSignup = (req, res, next) => {
    const user = new User(req.body.email, req.body.username, req.body.password, req.body.name, req.body.lastName);


    // Se envia POST al orchestador para que maneje las peticiones a los microservicios
    axios.post(`${process.env.ORCHESTRATOR}/auth/signup`, user)
        .then(response => {
            console.log(response.data);
            res.redirect('/');
        })
        .catch(err => {
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;

            // Se recibe el codigo de error del servicio y luego el orquestador lo vuelve a agregar en el objeto de error. Ahora, dependiendo del error se sabe si el usuario ya existe o los campos estan mal ingresados o si de lleno ocurrió otro error como el 500 de servidor
            if (errorStatus === 401) {
                res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login', errorMessage: 'Los datos ingresados no están correctos o el nombre de usuario ya existe' });
                return;
            } else {
                res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login', errorMessage: 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde' });
                return;
            }
        })
}


exports.getLogin = (req, res, next) => {
    // Chequeando si el usuario ya inició sesión en base a la existencia de Token.
    if (localStorage.getItem('token')) {
        let errorCode = 409;
        let errorMessage = 'Ya inició sesión en el sistema';
        res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
        return; // return para que no continue
    }
    res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login', errorMessage: null });
}

exports.postLogin = (req, res, next) => {

    const user = { username: req.body.username, password: req.body.password };

    // Se envia POST al orchestador para que maneje las peticiones a los microservicios
    axios.post(`${process.env.ORCHESTRATOR}/auth/login`, user)
        .then(response => {
            console.log(response.data);

            // Se guarda info del Token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('roleId', response.data.roleId);
            res.redirect('/');
        })
        .catch(err => { // TODO: Handle error codes if server is down
            const errorResponse = err.response;
            const errorStatus = errorResponse ? errorResponse.status : 500;

            // Se recibe el codigo de error del servicio y luego el orquestador lo vuelve a agregar en el objeto de error. Ahora, dependiendo del error se sabe si el usuario o contraseña estan mal o si de lleno ocurrió otro error como el 500 de servidor
            if (errorStatus === 401) {
                res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login', errorMessage: 'Usuario o contraseña incorrectos' });
                return;
            } else {
                res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login', errorMessage: 'Lo sentimos, ha ocurrido un problema de servidor. Intente nuevamente más tarde' });
                return;
            }
        })


}

exports.postLogout = (req, res, next) => {
    // Se remueve el Token del sistema
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('roleId');

    } catch (error) {
        console.log(error);

    } finally {
        res.redirect('/');
    }

}










    // const data = {
    //     'email': "hola@hola.com",
    //     'password': 123456,
    //     'name': "Juan"
    // };
    // const options = {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' }, // Tiene que ser application/x-www-form-urlencoded o sino desde Node al acceder al body no funcionara! CAMBIAR A JSON para que sea más RESTful
    //     data: qs.stringify(data),
    //     url: process.env.ORCHESTRATOR,
    // };
    // axios(options)
    //     .then(response => {
    //         console.log(response);
    //         res.redirect('/auth/login');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })



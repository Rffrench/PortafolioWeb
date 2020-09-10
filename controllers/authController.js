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
            console.log(err);
            res.redirect('/auth/login');
        })
}


exports.getLogin = (req, res, next) => {
    // Chequeando si el usuario ya inició sesión en base a la existencia de Token.
    if (localStorage.getItem('token')) {
        let errorCode = undefined;
        let errorMessage = 'Ya inició sesión en el sistema';
        res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });
        return; // return para que no continue
    }
    res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login' });
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
        .catch(err => {
            console.log(err);
            res.redirect('/auth/login');
        })


}

exports.postLogout = (req, res, next) => {
    // Se remueve el Token del sistema
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    res.redirect('/');
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



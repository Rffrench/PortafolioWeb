// Controlador para Autenticación

const User = require('../models/userModel');
const axios = require('axios');
const qs = require('qs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login' });
}

exports.postLogin = (req, res, next) => {
    const user = new User(req.body.username, req.body.password, "Juan");

    // Se envia POST al orchestador para que maneje las peticiones a los microservicios
    axios.post(process.env.ORCHESTRATOR, user)
        .then(response => {
            console.log(response);
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log(err);
        })


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


}
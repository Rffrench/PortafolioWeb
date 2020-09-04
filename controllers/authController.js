// Controlador para Autenticación

const User = require('../models/userModel');
const axios = require('axios');
const qs = require('qs');


exports.postSignup = (req, res, next) => {
    const user = new User(req.body.email, req.body.username, req.body.password, req.body.name, req.body.lastName);


    // Se envia POST al orchestador para que maneje las peticiones a los microservicios
    axios.post(`${process.env.ORCHESTRATOR}/auth/signup`, user)
        .then(response => {
            console.log('Usuario Ingresado');
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        })

}


exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login' });
}

exports.postLogin = (req, res, next) => {
    //const user = new User(req.body.username, req.body.password, "Juan");
    const user = { username: req.body.username, password: req.body.password };

    // Se envia POST al orchestador para que maneje las peticiones a los microservicios
    axios.post(`${process.env.ORCHESTRATOR}/auth/login`, user)
        .then(response => {
            console.log(response);
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
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
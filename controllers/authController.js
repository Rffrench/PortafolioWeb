// Controlador para Autenticación

const User = require('../models/userModel');
const axios = require('axios');
const qs = require('qs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login' });
}

exports.postLogin = (req, res, next) => {
    const data = {
        'email': "hola@hola.com",
        'password': 123456,
        'name': "Juan"
    };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: 'http://localhost:5000/api/v1/auth/login',
    };
    axios(options)
        .then(response => {
            console.log(response);
            res.redirect('/auth/login');
            console.log('Funciona');
        })
        .catch(err => {
            console.log(err);
        })


}
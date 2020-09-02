// Controlador para Autenticación

const User = require('../models/userModel');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', { pageTitle: 'Login Restaurante', path: '/auth/login' });
}

exports.postLogin = (req, res, next) => {
    console.log('Funciona');
    res.redirect('/auth/login');
}
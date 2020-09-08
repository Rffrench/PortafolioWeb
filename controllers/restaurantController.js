// Controlador restaurante

exports.getIndex = (req, res, next) => {
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('userId'));
    res.render('restaurant/index', { pageTitle: 'Restaurante Siglo XXI', path: '/' });
}
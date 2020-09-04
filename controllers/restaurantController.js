// Controlador restaurante

exports.getIndex = (req, res, next) => {
    res.render('restaurant/index', { pageTitle: 'Restaurante Siglo XXI', path: '/' });
}
// Controlador error 404

exports.get404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Página no encontrada', path: '/404' }) // El path da lo mismo puede ser cualquiera pq es 404
}
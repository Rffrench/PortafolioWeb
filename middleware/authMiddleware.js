const jwt = require('jsonwebtoken');

// Func for checking token once we log in so we can store the info about the user using the response locals object
exports.checkToken = (token, res) => {
    let decodedToken;

    try { // if there is a token verify it. If it is null it will come as a string so it should be set to null
        decodedToken = jwt.verify(token, 'llavetoken'); // El secret debería ir en un ENV
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    res.locals.userId = decodedToken.userId;
    res.locals.roleId = decodedToken.roleId;
    res.locals.iat = decodedToken.iat;
    res.locals.exp = decodedToken.exp;
    // agregar role ID

    return decodedToken;
};
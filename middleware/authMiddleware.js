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
    res.locals.email = decodedToken.email;
    // agregar role ID

    return decodedToken;
};

// For every request I verify the token again and if its still valid, if there is an error or smth it wont store the info
exports.checkUser = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'llavetoken', async (err, decodedToken) => {
                if (err) {
                    res.locals.userId = null;
                    res.locals.roleId = null;
                    res.locals.email = null;
                    next();
                } else {
                    res.locals.userId = decodedToken.userId;
                    res.locals.roleId = decodedToken.roleId;
                    res.locals.email = decodedToken.email;
                    next();
                }
            })
        } else {
            res.locals.userId = null;
            res.locals.roleId = null;
            res.locals.email = null;
            next();
        }
    } catch (error) {
        res.locals.userId = null;
        res.locals.roleId = null;
        res.locals.email = null;
        next();
    }
}
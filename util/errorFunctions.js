// Función que se utilizará mucho para lanzar mensajes de error cuando un usuario accede a una pag sin autenticarse o sin el rol necesario

const sendErrors = (errorResponse, res) => {
    // let errorInfo = [];
    let errorMessage = 'Ha ocurrido un error de servidor'; // mensaje por defecto 
    let errorCode = 500; // HTTP Code por defecto

    if (errorResponse) { // si la respuesta no es nula el orchestador respondio con el error
        errorCode = errorResponse.status; // ahora si se puede obtener el cod HTTP o sino tiraria error
        if (errorCode == 403) { // se ven los codigos de errores, dependiendo el codigo se identifica el problema
            errorMessage = 'No está autorizado para acceder a esta página';

        } else if (errorCode == 401) {
            errorMessage = 'No ha iniciado sesión para acceder a esta página';
        }
        else {

        }
    }

    res.render('error', { pageTitle: 'Error', path: '', errorCode: errorCode, errorMessage: errorMessage });

    // errorInfo.push(errorCode, errorMessage); // Se agregna a un array los datos y luego con Deestructuirng se sacan los valores
    // return errorInfo;
}

module.exports = sendErrors
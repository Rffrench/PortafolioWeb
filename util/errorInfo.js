// Función que se utilizará mucho para lanzar mensajes de error cuando un usuario accede a una pag sin autenticarse o sin el rol necesario

const getErrorInfo = (errorCode) => {
    let errorInfo = [];
    let errorMessage = '';
    if (errorCode == 403) { // se ven los codigos de errores, dependiendo el codigo se identifica el problema
        errorMessage = 'No está autorizado para acceder a esta página';
    }
    else {
        errorMessage = 'No ha iniciado sesión para acceder a esta página o ha ocurrido un error de servidor';
    }
    errorInfo.push(errorCode, errorMessage); // Se agregna a un array los datos y luego con Deestructuirng se sacan los valores
    return errorInfo;
}

module.exports = getErrorInfo
// Main File
require('dotenv').config(); // .env files

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//app.use(bodyParser.json()); // Acá no necesito que sea JSON la data pq los formularios la mandan como urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Controlador de Error (para que el middleware sea agregado a cada request en caso de un 404)
const errorController = require('./controllers/errorController');

// Rutas
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

// Registrando rutas
app.use('/auth', authRoutes); // Primer arg es un path que va previo a cualquier ruta registrada en authRoutes
app.use(restaurantRoutes);

// Se registra controlador para errores 404
app.use(errorController.get404);


// TODO: ARREGLAR ERRORS
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});



app.listen(3000);

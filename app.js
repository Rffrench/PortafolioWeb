// Main File
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Controlador de Error (para que el middleware sea agregado a cada request en caso de un 404)
const errorController = require('./controllers/errorController');

// Rutas
const authRoutes = require('./routes/authRoutes');

// Registrando rutas
app.use('/auth', authRoutes); // Primer arg es un path que va previo a cualquier ruta registrada en authRoutes

app.use(errorController.get404);


app.listen(3000);

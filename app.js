// Main File
require('dotenv').config(); // .env files

// Local Storage para los tokens. La comprobación se hace para no confundir el storage del browser y el de node
if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override'); // para que los forms funcionen con PUT y DELETE
const app = express();





// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

//app.use(bodyParser.json()); // Acá no necesito que sea JSON la data pq los formularios la mandan como urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function (req, res) { // PUT & DELETE en los forms
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method
        delete req.body._method
        return method
    }
}))


// Controlador de Error (para que el middleware sea agregado a cada request en caso de un 404)
const errorController = require('./controllers/errorController');

// AuthMiddleware (holds a function for checking the user and storing the token data in res.locals) (MUST BE AT THE TOP)
const authMiddleware = require('./middleware/authMiddleware');
app.all('*', authMiddleware.checkUser); // for every request this gets executed

// Rutas
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const adminRoutes = require('./routes/adminRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const financeRoutes = require('./routes/financeRoutes');

// Registrando rutas

app.use('/auth', authRoutes); // Primer arg es un path que va previo a cualquier ruta registrada en authRoutes
app.use(restaurantRoutes);
app.use('/admin', adminRoutes); // Rutas de administración. Distinto a la app del administrador pero ambas cosas se conectan al servicio de administración
app.use('/warehouse', warehouseRoutes);
app.use('/finance', financeRoutes);


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

const server = app.listen(3000);
console.log("Listening on port: "+ "3000" )

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  app.set('io',io);



var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var database = require("./config/database")
var auth = require("./auth/main_auth")


var funcionariosRouter = require('./routes/funcionarios.router');
var usuariosRouter = require('./routes/usuarios.router');
var premiosRouter = require('./routes/premios.router');
var eventosRouter = require('./routes/eventos.router');
var sucursalesRouter = require('./routes/sucursales.router');
var inscripcionesRouter = require('./routes/inscripcionesEventos.router');
var puntosRouter = require('./routes/puntos.router');
var imagenesRouter = require('./routes/imagenes.router');
const auth_admin = require('./auth/auth_admin');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static/images', express.static(path.join(__dirname,'../assets/images')));
app.use(cors());
//Mongo connection
database.mongoConnect();

app.use('/usuarios', usuariosRouter);

app.use('/api/images', imagenesRouter)
app.use(auth)
//Router
app.use('/api/funcionarios', auth_admin, funcionariosRouter);

app.use('/api/premios', premiosRouter);
app.use('/api/eventos', eventosRouter);
app.use('/api/sucursales', sucursalesRouter);
app.use('/inscripciones', inscripcionesRouter);
app.use('/puntos', puntosRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
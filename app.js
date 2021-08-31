
/**
 * Required External Modules
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pug = require('pug');

// sequelize 

const sequelize = require('./models').sequelize;
sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  


var indexRouter = require('./routes/index');
var bookRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/books', bookRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err  = new Error()
  err.message = 'Page Not Found'
  err.status = 404
  console.log('404 page not found')
  res.render('page-not-found', {err})
  
});

// error handler that shows on non existient route (confirmed to render multiple times)
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = err;
// render the error page
  res.status(err.status || 500);
  res.render('error');

  if(res.status == 404){
    res.render('page-not-found', {err})
  }
});






module.exports = app;

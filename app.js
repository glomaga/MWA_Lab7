//======================================================
//===================1.DEPENDENCIES=====================//
//======================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

//======================================================
//=================2.INSTANTIATIONS=====================//
//======================================================
var index = require('./routes/index');
var secret = require('./routes/secret');

//INICIALIZATION
var app = express();

//======================================================
//===================3.CONFIGURATIONS====================//
//======================================================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//======================================================
//===================4.MIDDLEWARE=========================//
//======================================================
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'mwa'}));// this is the middleware express-session . always after cookieParser



//======================================================
//===================5.ROUTES============================//
//======================================================
app.use('/', index);
app.use('/secret', secret);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//======================================================
//=============6.ERROR HANDLING==========================//
//======================================================
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//======================================================
//===================7.BOOTUP===========================//
//======================================================
app.listen(8080);
module.exports = app;

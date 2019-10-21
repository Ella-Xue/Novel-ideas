var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const novels = require("./routes/novels");
const db = require("./routes/db");
const user = require("./routes/users")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Our Custom Donation Web App Routes
app.get('/novels', novels.findAll);
app.get('/novels/:id', novels.findOne);
app.post('/novels',novels.addNovel);
app.put('/novels/:id', novels.giveGrade);
app.delete('/novels/:id', novels.deleteNovel);

app.get('/users/:id',user.getInfo);
app.post('/users',user.addUser);
app.put('/users/:id', user.modifyPassword);
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

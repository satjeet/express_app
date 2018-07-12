const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/* ya no es necesario con la implementacion de controllers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);
*/
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongodb
mongoose
  .connect(
    'mongodb://localhost:27017/express_app',
    { useNewUrlParser: true },
    function() {
      console.log('Connection has been made');
    }
  )
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// Require file system module
const fs = require('file-system');

// Include controllers
fs.readdirSync('controllers').forEach(function(file) {
  if (file.substr(-3) == '.js') {
    const route = require('./controllers/' + file);
    route.controller(app);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, function() {
  console.log('listening on 3000');
});

module.exports = app;

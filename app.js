var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');

var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var mongo = require('mongodb');

var router = require('./routes/index');

hbs.registerHelper('toDateString', function(date) {
	var dateNum = new Date(date);
	var nowDateNum = new Date();
	var difference = nowDateNum - dateNum;
	if (difference < (1000 * 60)) {
		var seconds = difference / 1000;
		return seconds.toFixed(0) + ' seconds ago';
	} else if (difference < (1000 * 60 * 60)) {
		var minutes = difference / (1000 * 60);
		return minutes.toFixed(0) + ' minutes ago';
	} else if (difference < (1000 * 60 * 60 * 24)) {
		var hours = difference / (1000 * 60 * 60); // pass into function
		return hours.toFixed(1) + ' hours ago';
	} else if (difference < (1000 * 60 * 60 * 24 * 30)) {
		var days = difference / (1000 * 60 * 60 * 24);
		return days.toFixed(0) + ' days ago';
	} else if (difference < (1000 * 60 * 60 * 24 * 365)) {
		var months = difference / (1000 * 60 * 60 * 24 * 30);
		return months.toFixed(0) + ' months ago';
	} else {
		var years = difference / (1000 * 60 * 60 * 24 * 365);
		return years.toFixed(0) + ' years ago';
	}
});

hbs.registerHelper('shortDateString', function(date) {
	// format date
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

	return date.toLocaleDateString('en-US', options);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

// app.use(express.json());	// don't need express.json()
// app.use(express.urlencoded({ extended: false })); // don't need express.urlencoded()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({ secret: 'orcacucumber', resave: true, saveUninitialized: true}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

// Connect Flash
app.use(flash());

// setup flash
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
})

// setup routes
app.use('/', router);

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

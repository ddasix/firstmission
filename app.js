
/**
 * Module dependencies.
 * supervisor app.js
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var main = require('./routes/widgets');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
	if (err) // ...
	console.log('meow');
});


// var Schema = mongoose.Schema;
// /* 
// *	DB Connect
// */
// var Widget = new Schema({
// 	sn:{type:String,required:true,trim:true,unique:true},
// 	name:{type:String,required:true,trim:true},
// 	desc:String,
// 	price:Number
// });
// var widget = mongoose.model('Widget',Widget);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/stats', main.stats);
app.get('/robots.txt',routes.robots);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

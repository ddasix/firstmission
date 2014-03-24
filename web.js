var express = require('express');
var http = require('http');

var routes = require('./routes');
var mission = require('./routes/mission');
var products = require('./routes/products');
var tools = require('./routes/tools');
var team = require('./routes/team');
var contact = require('./routes/contact');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var app = express();

mongoose.connect('mongodb://localhost/mydb');

// Controller
var UserSchema = new Schema({
	age:Number,
	name:String,
	sex:Boolean
});

// Model --> collection
var UserModel = mongoose.model('uses',UserSchema);


app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine','jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development',function(){
	app.use(express.errorHandler({
		dumpExceptions:true,
		showStack:true
	}));
});

app.configure('production',function(){
	app.use(express.errorHandler());
});

app.get('/',routes.index);

app.get('/mission',mission.index);
app.get('/products',products.index);
app.get('/tools',tools.index);
app.get('/team',team.index);
app.get('/contact',contact.index);


app.param('name',function(req, res, next, name){
	UserModel.find({name:name},function(err,docs){
		req.user = docs[0];
		next();
	});
});

app.get('/users/:name',function(req,res){
	res.render('./show',{
		title:'Express User',
		user:req.user
	});
});

app.get('/users/:name/edit',function(req,res){
	res.render('./edit',{
		title:'Express User',
		user:req.user
	});
});

app.get('/users',function(req,res){
	UserModel.find({},function(err,docs){
		if (!err) {
			res.render('./users',{
				title:'Express User',
				users:docs
			});
		};
	});
});

app.get('/users/new',function(req,res){
	res.render('./new',{layout:false}); //,user:{name:'',age:0,sex:false}}); //,{ title: 'Express User'});
});

app.del('/users/:name',function(req,res){
	UserModel.remove({name:req.params.name},function(err){
		if (!err) {
			res.redirect('/users');
		}
	});
});

app.post('/users',function(req,res){
	var b = req.body;
	new UserModel({
		name : b.name,
		age : b.age,
		sex : b.sex
	}).save(function(err,user){
		if (err) {
			res.json(err);
		}else{
			res.redirect('/users/'+user.name);
		}
	});
});

app.put('/users/:name/edit',function(req,res){
	var b = req.body;
	UserModel.update(
		{name:req.params.name},
		{name:b.name,age:b.age,sex:b.sex},
		function(err){
			if (!err) {
				res.redirect('/users/'+b.name);
			}
		}
	);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
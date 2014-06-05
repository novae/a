var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');


mongoose.connect("mongodb://sourcode:sourcode@novus.modulusmongo.net:27017/e8Veharu");
var Usuario = require('./usuario.js');

var app = express();
var port = process.env.PORT || 3000;
/*jc*/
app.set('json spaces', 40);

app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cors());


app.get('/', function(req, res) {
    Usuario.find(function(err,usuarios){
    	if(err){
    		console.log(err);
    	}else{
    		res.json(usuarios);
    	}
    });
    
});


app.post('/login',cors(), function(req, res,next) {
    Usuario.findOne({ 'nombre':req.body.nombre },function(err,usuarios){
    	if(err){
    		console.log(err);
    	}else{
    		if(usuarios){
	    		var x = usuarios.toJSON();    		
	    		if(x.pass == req.body.pass){
	    			/*jc*/
	    			res.json({ login: 1 });
	    		}else{
	    			/*jc*/
	    			res.json({ login: 1 });
	    		}
	    	}else{
	    		res.send(false);
	    	}
    	}
    });

});

app.post('/signUp',cors(), function(req, res,next) {
    new Usuario({ 
    	nombre : req.body.nombre,
    	email : req.body.email,
    	pass : req.body.pass,
    	regId: req.body.regId
    }).save(function(err){
    	if(err){
    		res.send(false);
    	}else{
    		res.send(true);
    	}
    });


});

app.listen(port);
console.log('Magic happens on port ' + port);



var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var gcm = require('node-gcm');

var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyC-aZfrwWIyqtxXI4lQR1pUJ7mOgJBY7YQ');



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

app.get('/send', function(req, res) {
    Usuario.find(function(err,usuarios){
    	if(err){
    		console.log(err);
    	}else{
    		
    		var registrationIds = [];
			
			for(i in usuarios){
				registrationIds.push(usuarios[i].regId);
			}
			// Value the payload data to send...
			message.addData('message',"dos \u270C Peace, Love \u2764 and PhoneGap \u2706!");
			message.addData('title','ese sam' );
			message.addData('msgcnt','3'); // Shows up in the notification in the status bar
			message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
			//message.collapseKey = 'demo';
			//message.delayWhileIdle = true; //Default is false
			message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.


			sender.send(message, registrationIds, 4, function (result) {
			    console.log(result);
			});


			res.send('Mensajes enviados');
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



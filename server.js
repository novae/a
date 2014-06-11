var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var gcm = require('node-gcm');
//var ejs = require('ejs');

var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyC-aZfrwWIyqtxXI4lQR1pUJ7mOgJBY7YQ');



mongoose.connect("mongodb://sourcode:sourcode@novus.modulusmongo.net:27017/e8Veharu");
var Usuario = require('./usuario.js');

var app = express();
var port = process.env.PORT || 3000;
/*jc*/
app.set('json spaces', 40);
app.set('views', __dirname + '/public');
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cors());




app.get('/allusers',function(req,res){
    Usuario.find( function ( err, todos){
        if(err){
            res.send(err);
        }
        res.json(todos);
    });
});


app.post('/tosend',function(req,res){
    console.log(req.body);
    //req.body
    //req.params
    //req.jquery

    /*for (var user in req.body) {
        console.log(user.nombre);
    }
    */
    var data = req.body;
    console.log(data.length);
        //console.log("User " , data[key] , " is #" , key); // "User john is #234"
        
    for(var i=0; i<data.length-1; i++){
        console.log(data[i].nombre);
    }
    console.log(data[data.length-1].mensaje);


    
});


/*app.get('/', function(req, res) {
    Usuario.find(function(err,usuarios){
    	if(err){
    		console.log(err);
    	}else{
    		res.json(usuarios);
    	}
    });
    
});

*/
/*
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
*/


app.post('/login',cors(), function(req, res,next) {
    Usuario.findOne({ 'nombre':req.body.nombre },function(err,usuarios){
    	if(err){
    		console.log(err);
    	}else{
    		if(usuarios){
	    		var x = usuarios.toJSON();    		
	    		if(x.pass == req.body.pass){
	    			
	    			res.json({ login: 1 });
	    		}else{
	    			
	    			res.json({ login: 0 });
	    		}
	    	}else{
	    		res.send(false);
	    	}
    	}
    });

});
/*

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
*/
app.get('/',function(req,res){
    res.sendfile('./public/allusers.html');
});


app.listen(port);
console.log('Magic happens on port ' + port);



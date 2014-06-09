
var app = angular.module('sourcodemessage',[]);

app.controller('MainCtrl',function($scope,$http){
	
	//Obtener todos los usuarios

	$http.get('/allusers')
		.success(function(data) {
			$scope.usuarios = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
	});
	

	// crea una arreglo con los usuarios destinatarios del mensaje
	$scope.ischecked = function(){
		$scope.remisores = [];
		angular.forEach($scope.usuarios,function(usuario){
			if(usuario.isChecked == true){
				$scope.remisores.push(usuario);	
			}
		});
	}
	//enviar un mensaje al usuario(s) seleccionado.
	$scope.sendMessage = function() {
		var jsonData = JSON.stringify({mensaje : $scope.usuario.mensaje});
		console.log(jsonData);
		$scope.remisores = $scope.remisores.concat(jsonData);
		
		$http.post('/tosend', $scope.remisores)
		.success(function(data) {
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: '+ data);
		});
	};


});

app.controller('test',function($scope,$http){

	$scope.prueba = 'mensaje';

	$http.get('/allusers')
		.success(function(data) {
			$scope.usuarios = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
	});

	$scope.miclick = function(){
		
	}

});	

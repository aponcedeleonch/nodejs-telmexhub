//Importamos la dependenca express. Utilizando NPM
var express = require("express");
var nunjucks = require("nunjucks");

//Invocamos la funcion express para crear un servidor web
var app = express();

//Configuramos nunjucks. Sistema de templates
//Variable dinamica, que genera node, con la ruta actual donde se encuentre el archivo
nunjucks.configure(__dirname + "/vistas", {
	//Le asignamos el servidor de express
	express: app
});

//Levantan el servidor en el puerto 8080
app.listen(8080);

//Definir rutas para mi proyecto web
//En esta funcion se ejecuta todo el codigo para la ruta localhost:8080
app.get("/", function(req, res){
	//Response para lo que mandas al servidor
	//Request para lo que recibes del servidor
	res.send("Hola");
});

//En esta funcion se ejecuta todo el codigo para la ruta localhost:8080/informes
app.get("/informes", function(req, res){
	res.send("Aqui hay informes");
});

//Importamos la dependenca express. Utilizando NPM
var express = require("express");
var nunjucks = require("nunjucks");

//Requerimos nuestros modulos, en principal.js
var modelos = require("./modelos/principal.js");
console.log("Prueba: " + modelos.PRUEBA);

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

app.get("/articulo", function(req, res){
	//Hacemos la consulta para buscar el primer renglon
	modelos.Articulo.find(1).success(function(articulo){
		//Este metodo se ejecuta cuando encuentra algo
		console.log("Articulo: " + articulo.titulo);
		res.render("articulo.html", {
			articuloPrincipal: articulo
		});
	});
});

app.get("/blog", function(req, res){
	res.render("blog.html");
});

app.get("/usuario", function(req, res){
	res.render("usuario.html");
});

/*
 * Para no tener que parar e iniciar el servidor ante todos los cambios, hay que instalar supervisor
 * $ npm install supervisor -g
 * Y despues correr el servidor con el supervisor
 * $ supervisor servidor.js
 * 
 * Podemos instalar sequelize, que nos permite soportar varios manejadores al mismo tiemoo
 * $ npm install sequelize --save
 * Instalando sus dependencias
 * $ npm install sqlite3 --save
 * $ npm install pg --save (se necesita python)
 */

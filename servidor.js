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

//Seleccionando un solo registro
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

//Con una expresion regular, indica que igual manejara las paginas con diagonal numerica
app.get("/articulo/:articuloId([0-9]+)", function(req, res){
	//Con req.params recupera el numero de la expresion regular y lo asigna a la variable
	var articuloId = req.params.articuloId;
	//Hacemos la consulta para buscar el articulo ingresado en la ruta
	modelos.Articulo.find({
		where:{id: articuloId},
		include: [{
			model: modelos.Comentario,
			as: "comentarios"
		}, {
			model: modelos.Categoria,
			as: "categorias"
			}]
	}).success(function(articulo){
		//Este metodo se ejecuta cuando encuentra algo
		//console.log("Articulo: " + articulo.titulo);
		res.render("articulo.html", {
			articuloPrincipal: articulo
		});
	});
});

//Seleccionando varios registros
app.get("/usuario", function(req, res){
	modelos.Usuario.find({
		where:{id: 2},
		include: [{
			model: modelos.Articulo,
			//Este parametro debe ser igual al que se uso en la declaracion de la llave foranea
			as:"articulos"
		}]
	}).success(function(usuario){
		res.render("usuario.html", {
			usuario: usuario
		});
	});
});

//Pasando varios argumentos a la vista
//Ingresando un valor desde la URL de la forma ?offset=1
app.get("/blog", function(req, res){
	var offs = req.query.offset;
	modelos.Articulo.findAll({
		//Limitando la busqueda a 3 registros
		limit:3,
		//Dandole offset
		offset: offs
	}).success(function(articulos){
		modelos.Categoria.findAll().success(function(categorias){
			res.render("blog.html", {
				articulos: articulos,
				categorias: categorias
			});
		});	
	});
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

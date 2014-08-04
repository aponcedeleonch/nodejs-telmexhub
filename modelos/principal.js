
//Traera el modulo sequelize que previamente fue instalado
//Esta variable nos permitira configurar la base de datos

var Sequelize = require("sequelize");

var sequelize = new Sequelize("NOMBRE_BASE", "USUARIO DE BD", "CONTRA", {
	dialect: "sqlite", //Otros valores para otras BD: postgres, mysql, mariadb
	//Esta propiedad solo es para sqlite
	storage: __dirname + "/database.db",
	define: {
		//No esten disponibles las columnas de feha de la creacion de las tablas
		timestamps: false,
		//Deshabilita la convencion por default para el nombre de las tablas
		freeeTableName: true
	}
});

//Las operaciones en disco duro en node, se hacen de manera asincrono
sequelize.authenticate().success(function (){
	console.log("Base lista");
});
//Al hacerse de manera asincrona las operaciones en node.js es mucho mas poderoso y rapido
//Por esa misma razon se podria ejecutar la siguiente linea, antes de que termine de conectarse a la base
//console.log("Base lista");

//module.exports es un objeto que nos permite hacer visibles datos de este archivo

module.exports.PRUEBA = "hola";

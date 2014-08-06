
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

//Sincronia
	//Se lee todo de disco duro
	//Se ejecuta la siguiente liena
//Las operaciones en disco duro en node, se hacen de manera asincrono
sequelize.authenticate().success(function (){
	//Se ejecuta en callback esta funcion
	console.log("Base lista");
});
//Al hacerse de manera asincrona las operaciones en node.js es mucho mas poderoso y rapido
//Por esa misma razon se podria ejecutar la siguiente linea, antes de que termine de conectarse a la base
//console.log("Base lista");

//module.exports es un objeto que nos permite hacer visibles datos de este archivo

module.exports.PRUEBA = "hola";


//Mapeos a la tabla con sequelize

var Articulo = sequelize.define("Articulo", {
	id:{
		//Indicamos que es una columna con llave primaria
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	//Columa titulo de texto
	titulo: Sequelize.TEXT,
	contenido: Sequelize.TEXT,
	fecha_creacion: Sequelize.DATE
}, {
	//tableName indica cual es el nombre de la tabla que se quiere consultar
	tableName: "articulos"
});


//Tabla de usuarios

var Usuario = sequelize.define("Usuario", {
	id:{
		//Indicamos que es una columna con llave primaria
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	//Columa titulo de texto
	nombre: Sequelize.TEXT,
	email: Sequelize.TEXT,
	password: Sequelize.TEXT
}, {
	//tableName indica cual es el nombre de la tabla que se quiere consultar
	tableName: "usuarios"
});

//Tabla de categorias

var Categoria = sequelize.define("Categoria", {
	id:{
		//Indicamos que es una columna con llave primaria
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	//Columa titulo de texto
	nombre: Sequelize.TEXT
}, {
	//tableName indica cual es el nombre de la tabla que se quiere consultar
	tableName: "categorias"
});

//Tabla Comentarios

var Comentario = sequelize.define("Comentario", {
	id: {
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	comentario: Sequelize.TEXT
}, {
	tableName: "comentarios"
});

//Mapeos de tabla a tabla

//De 1 a N

//1 usuario tiene muchos articulos
Usuario.hasMany(Articulo, {
	foreignKey: "usuario_id",
	as: "articulos"
});

//1 articulo tiene muchos comentarios
Articulo.hasMany(Comentario, {
	foreignKey: "articulo_id",
	as: "comentarios"
});

//De N a N

//muchas categorias tienen muchos articulos

Articulo.hasMany(Categoria, {
	foreignKey: "articulo_id",
	as: "categorias",
	//Parametro solo para la relacion N-N
	through: "categorias_articulos"
});

Categoria.hasMany(Articulo, {
	foreignKey: "categoria_id",
	as: "articulos",
	//Parametro solo para la relacion N-N
	through: "categorias_articulos"
});

//Exporta todas las tablas
module.exports.Usuario = Usuario;
module.exports.Categoria = Categoria;
module.exports.Articulo = Articulo;
module.exports.Comentario = Comentario;
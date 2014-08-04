console.log("Hola mundo node.js");

var curso = "node.js";

//Forma 1 de objetos
var persona = {
	nombre: "Bruno",
	edad: 25
};

persona.trabajo = "estudiante";


//Forma 2 de objetos
var persona2 = new Object();
persona2.nombre = "Arthur";
persona2.edad = 30;


console.log("Edad Arthur: " + persona2.edad);


//Declaracion de funciones 1
function sumar(a, b){
	return a+b;
}

//Declaracion de funciones 2. Funciones anonimas
var multiplicar = function(a, b){
	return a*b;
};

console.log("1+2 = " + sumar(1, 2));
console.log("2*3 = " + multiplicar(2, 3));

var dividir = function(a, b){
	return a/b;
};

//Declaracion de funciones 3. Funcion de alto nivel
function operacion(miFuncion, a, b){
	return miFuncion(a, b);
}

var resultado = operacion(sumar, 2, 3);
console.log("Resultado: " + resultado);

resultado = operacion(multiplicar, 2, 3);
console.log("Resultado: " + resultado);

resultado = operacion(dividir, 4, 2);
console.log("Resultado: " + resultado);

/*
 * En Consola
 * Para poder instalar dependencias y tener un registro de esos cambios
 * $ npm init
 * 
 * En caso de marcar error con la carpeta express o algo parecido
 * Abrir Git Bash, dirigirse a la ruta que marca el error y crear la carpeta npm
 * $ cd "C:\Users\Hubber\AppData\Roaming"
 * $ mkdir npm
 * 
 * Agregar la dependencia express
 * npm install express --save
 */
//Vamos a levantar un servidor utilizando node js
//Modulo http, nos sirve para levantar un servidor http
const http = require("http");

//La funcion create server recibe como parametro un callback
//Servidor recibe una peticion del cliente (navegador) y luego da una respuesta
const server = http.createServer((req, res) => {
  res.end("Hola mundo actualizado");
});

//Servidor escuche en un puerto en especifico
//Primer parametro es el puerto donde vamos a levantar el servidor
//Segundo parametro es una funcion callback
server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

const http = require("http");

//Vamos a especificar en la respuesta que da el servidor, el tipo de dato que vamos a responder
const server = http.createServer((req, res) => {
  //En el response podemos enviar datos adicionales, vamos a enviar headers
  //Content-Type, este header especifica el tipo de data que vamos a enviar
  res
    .setHeader("Content-Type", "text/html")
    .end("<h1>Usando HTML en el servidor</h1>");
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

const http = require("http");

const server = http.createServer((req, res) => {
  const { url } = req;
  //res.end permite finalizar la respuesta y retornar la informacion al cliente
  //en el camino podemos ir agregando cosas antes de finalizar la respuesta
  if (url === "/") {
    res.write("El cliente solicito el home");
  } else if (url === "/usuarios") {
    res.write("Aqui esta la informacion de usuarios");
  } else if (url === "/productos") {
    res.write("Aqui esta la informacion de productos");
  } else {
    res.statusCode = 404;
    res.write("Ruta no encontrada");
  }

  res.end();
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

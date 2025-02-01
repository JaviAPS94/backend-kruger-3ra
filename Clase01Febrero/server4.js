const http = require("http");

const server = http.createServer((req, res) => {
  //http://localhost:8080/usuario?age=10&genre=M
  console.log(req.headers.host);
  //http://localhost:8080
  const baseUrl = `http://${req.headers.host}`;
  const reqUrl = new URL(req.url, baseUrl);
  const searchParams = new URLSearchParams(reqUrl.searchParams);
  console.log(searchParams.get("genre"));
  console.log(searchParams);
});

server.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});

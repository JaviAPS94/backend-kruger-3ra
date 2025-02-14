//Vamos a crear nuestra primera API REST
//para esto vamos a usar el modulo de http
//Vamos a construir servicios web o endpoint para administrar nuestras ventas
const http = require("http");
const crudModule = require("./crud");

//Vamos a definir una funcion para poder procesar el body que nos llega en cada peticion
//que haga el cliente
//Util cuando recibimos informacion o datos del cliente o frontend
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    //Vamos a capturar toda la informacion que llega en el body del request
    //Para esto vamos a utilizar eventos asociados al request
    let body = "";
    //Vamos a conectarnos o escuchar un evento de data
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

//Creamos nuestro servidor http
const server = http.createServer(async (req, res) => {
  //req: permite obtener toda la informacion de la peticion que esta haciendo el cliente
  //res: permite enviar informacion al cliente
  try {
    //Vamos a definir un servicio que nos permita obtener todas las ventas
    //Una ruta para poder acceder a las ventas -> /sales
    //Para poder obtener todas las ventas debes usar el metodo GET (Verbo http)
    //Cuando usamos un verbo tipo GET, NO SE DEBE ENVIAR UN BODY EN EL REQUEST
    console.log(req.method);
    console.log(req.url);
    //Vamos a validar si le metodo o verbo http es GET y la ruta es /sales
    // (debemos retornar toda la informacion de las ventas)
    if (req.method === "GET" && req.url === "/sales") {
      const sales = await crudModule.readSales();
      //tanto el res y res, tienen metadata que se envia en el request o el response
      //Headers y el body
      //Headers podemos enviar el formato de la respuesta (json)
      //Body: es la informacion que se envia en la respuesta o request
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(sales));
    }
    //Vamos a definir un servicio que nos permita crear una venta
    //POST /sales Este POST debe recibir informacion de la venta {}
    //La informacion de la venta va a llegar en el body del request
    else if (req.method === "POST" && req.url === "/sales") {
      //Debemos obtener los datos que vamos a almacenar y guardar en la base de datos
      const newSale = await parseBody(req);
      await crudModule.createSale(newSale);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Venta creada exitosamente" }));
    }
    //Servicio para actualizar una venta, vamos a hacer una actualizacion total
    // PUT -> /sales/:id -> id es dinamico
    // PUT -> /sales/10 -> Actualizar la venta con id 1
    else if (req.method === "PUT" && req.url.startsWith("/sales/")) {
      //Recibe dos parametros, el primero es el id de la venta que queremos actualizar
      //Los nuevos datos de la venta
      console.log(req.url);
      //vamos a divivir la url en un arreglo, separado cada elemento por el caracter /
      //OJO cualquier parametro que recibamos en la url, siempre es de tipo string
      const id = Number(req.url.split("/")[2]);
      const newData = await parseBody(req);
      console.log(id);
      console.log(newData);
    }
    //DELETE by id
  } catch (error) {
    console.log(error);
  }
});

server.listen(8080);

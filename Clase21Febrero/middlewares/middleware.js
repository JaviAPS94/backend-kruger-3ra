import express from "express";

const app = express();

//Middleware global o a nivel de aplicacion
const middlewareGlobal = (req, res, next) => {
  //Cada vez que llegue una peticion a cualquiera de nuestros servicios
  //vamos a ejecutar este middleware
  console.log("Middleware global ejecutado");
  next();
};

app.use(middlewareGlobal);

//Middleware especifico
//Este middleware solamente se ejecutara en la ruta que yo lo llame
const middlewareEspecifico = (req, res, next) => {
  console.log("Middleware especifico ejecutado");
  next();
};

app.get("/", (req, res) => {
  res.send("Pagina de inicio");
});

app.get("/ruta-especifica", middlewareEspecifico, (req, res) => {
  res.send("ruta especifica");
});

//Multiples middlewares
//El primer se va a encargar de mostrar la url que se esta solicitando
const middlewareUrl = (req, res, next) => {
  console.log("Request URL: ", req.originalUrl);
  next();
};
//El segundo se va a encargar de mostrar el metodo(GET, POST, DELETE, etc....) que se esta solicitando
const middlewareMethod = (req, res, next) => {
  console.log("Request type: ", req.method);
  next();
};

const logs = [middlewareUrl, middlewareMethod];

app.get("/ruta-con-varios-middlewares", logs, (req, res) => {
  res.send("Ruta con varios middlewares");
});

app.listen(8080);

//vamos a craer nuestro primer servidor con express
//importar el modulo de express
import express from "express";

const app = express();

//Para definir un servicio, defino el verbo http y la ruta
app.get("/", (req, res) => {
  res.send("Hola mundo primer servicio (endpoint) con express");
});

app.post("/", (req, res) => {
  res.send("Hola mundo primer servicio (endpoint) con express usando post");
});

app.get("/json", (req, res) => {
  res.json({ message: "Hola mundo" });
});

//Como obtener un path param
//GET -> /students/1
app.get("/students/:id", (req, res) => {
  //Dentro del objeto request tenemos un valors que se llama params
  //en este params nos llegan todos los path params que hayamos definido
  const { id } = req.params;

  res.send(`El id del estudiante es: ${id}`);
});

//Como obtener los query params
//GET -> /search?name=juan&age=20&email=alex.com
app.get("/search", (req, res) => {
  //Vamos a trabajar con el objeto request
  //En el objeto request tenemos un valor que se llama query
  const { name, age, email } = req.query;
  res.send(`El nombre es: ${name}, la edad es: ${age}, el email es: ${email}`);
});

app.listen(8080);

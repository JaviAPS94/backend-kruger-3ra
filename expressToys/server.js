//Vamos a construir un servidor http que va a proporcionar servicios para poder
// administrar juguetes
// C -> Vamos a tener un servicio que nos permita crear un juguete (POST) /toys
// R -> Vamos a tener un servicios que nos permite obtener los juguetes (GET) /toys [1,2,3,4]
// U -> Vamos a tener un servicio que nos permita actualizar un juguete (PATCH) /toys/:id
// D -> Vamos a tener un servicio que nos permita eliminar un juguete (DELETE) /toys/:id

//Hay situaciones puntuales donde el GET para leer datos se queda corto (no deberia recibir un body)
// Y se vuelve necesario el uso de un POST, ya que podemos tener filtros complicados
// POST -> /toys
// {
//     "ids": [1,2,3,4]
// }
import express from "express";
import fs from "fs/promises";
import Joi from "joi";

const app = express();

//Middleware para poder recibir datos en formato json
app.use(express.json());

//Vamos a definir un schema de validacion para los juguetes
//Este schema contiene las reglas que debemos seguir al momento de guardar un juguete
// name -> debe ser un string y debe ser obligatorio
// price -> debe ser un numero y debe ser obligatorio
// description -> debe ser un string y debe ser obligatorio
const toySchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
});

const getToysFromDB = async () => {
  const toys = await fs.readFile("./db/toys.json");
  return JSON.parse(toys);
};

app.get("/toys", async (req, res) => {
  //Vamos a obtener los registros que esten almacenados en la base de datos (archivo json)
  //Temos que leer los datos almacenados en el archivo json
  const toys = await getToysFromDB();
  res.json(toys);
});

//Vamos a crear un servicio que nos permita obtener un juguete por su identificador
//GET -> /toys/:id
//Deberiamos filtrar unicamente el juguete que tenga el id que estamos recibiendo
app.get("/toys/:id", async (req, res) => {
  const toys = await getToysFromDB();
  const toy = toys.find((toy) => toy.id === parseInt(req.params.id));

  if (!toy) {
    return res.status(404).json({ message: "El jugue no existe" });
  }

  res.json(toy);
});

//Vamos a crear un servicio que me permite almacenar un juguete
// POST -> /toys
// Nunca confiarse de lo que envia el front, por esa razon vamos a validar
// que los datos que estamos recibiendo sean correctos
// Debemos tener si o si los campos name, description, price
// Joi -> Libreria para validar datos (Y no hacerlo de manera manual)
app.post("/toys", async (req, res) => {
  //ANTES de ejecutar la logica de nuestro servicio, siempre validamos lo que nos envia el front
  //La funcion validate recibe como parametro dos cosas
  // 1. El objeto que queremos validar (lo que envia el front)
  // 2. Le pasamos determinadas opciones a nuestro validator
  // convert en true, hace que Joi haga una conversion de datos de manera automatica
  // "25" -> 25
  const { error } = toySchema.validate(req.body, { convert: false });
  if (error) {
    //El rango de los errores 400 (400 - 499) son errores del cliente
    return res.status(400).json({ error: error.details[0].message });
  }

  //Vamos a utilizar la generacion de un uuid(string -> DHSDHFHV37785FHJDGJ) para poder asignar un id unico a nuestro juguete
});

app.listen(8080);

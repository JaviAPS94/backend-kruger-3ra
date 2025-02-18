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
import { v4 as uuidv4 } from "uuid";

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

const toyUpdateSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
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
  const uuid = uuidv4();

  //Vamos a leer todos los juguetes del archivo json
  const toys = await getToysFromDB();
  //Vamos a insertar un nuevo juguete a nuestro arreglo
  toys.push({ id: uuid, ...req.body });

  await fs.writeFile("./db/toys.json", JSON.stringify(toys, null, 2));

  res.status(201).json({ message: "Juguete creado con exito" });
});

//Vamos a crear un servicio que me permita actualizar un juguete
//PATCH -> /toys/:id
app.patch("/toys/:id", async (req, res) => {
  const { error } = toyUpdateSchema.validate(req.body, { convert: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //Implementacion del servicio
  const { id } = req.params;
  //Vamos a resolver la logica de actualizacion
  const toys = await getToysFromDB();
  const toyIndex = toys.findIndex((toy) => toy.id === id);
  //Si el juegue existe, retornar la posicion del juguete en el arreglo
  //Si el juguete no existe, retorna -1
  if (toyIndex === -1) {
    return res.status(404).json({ message: "El juguete no existe" });
  }

  //Vamos a actualizar el juguete
  const toyToUpdate = toys[toyIndex];

  //Vamos a actualizar unicamente los campos que nos envia el front
  //toyUpdated = { ...toyToUpdate, ...req.body }
  Object.assign(toyToUpdate, req.body);

  toys[toyIndex] = toyToUpdate;

  await fs.writeFile("./db/toys.json", JSON.stringify(toys, null, 2));

  res.json({ message: "Juguete actualizado con exito" });
});

//Vamos a crear un servicio que me permita eliminar un juguete
//splice

app.listen(8080);

import express from "express";
import fs from "fs/promises";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

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

const getToys = async (req, res) => {
  const toys = await getToysFromDB();
  res.json(toys);
};

const getToyById = async (req, res) => {
  const toys = await getToysFromDB();
  const toy = toys.find((toy) => toy.id === parseInt(req.params.id));

  if (!toy) {
    return res.status(404).json({ message: "El jugue no existe" });
  }
  res.json(toy);
};

const createToy = async (req, res) => {
  const { error } = toySchema.validate(req.body, { convert: false });
  if (error) {
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
};

const updateToy = async (req, res) => {
  const { error } = toyUpdateSchema.validate(req.body, { convert: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  //Implementacion del servicio
  const { id } = req.params;
  //Vamos a resolver la logica de actualizacion
  const toys = await getToysFromDB();
  const toyIndex = toys.findIndex((toy) => toy.id === id);
  if (toyIndex === -1) {
    return res.status(404).json({ message: "El juguete no existe" });
  }

  //Vamos a actualizar el juguete
  const toyToUpdate = toys[toyIndex];

  Object.assign(toyToUpdate, req.body);

  toys[toyIndex] = toyToUpdate;

  await fs.writeFile("./db/toys.json", JSON.stringify(toys, null, 2));

  res.json({ message: "Juguete actualizado con exito" });
};

const deleteToy = async (req, res) => {
  const id = req.params.id;
  const toys = await getToysFromDB();
  const toyIndex = toys.findIndex((el) => el.id === id);

  if (toyIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "id not exist",
    });
  }

  toys.splice(toyIndex, 1);

  await fs.writeFile("./db/toys.json", JSON.stringify(toys));

  res.end();
};

app.get("/toys", getToys);
app.get("/toys/:id", getToyById);
app.post("/toys", createToy);
app.patch("/toys/:id", updateToy);
app.delete("/toys/:id", deleteToy);

app.listen(8080);

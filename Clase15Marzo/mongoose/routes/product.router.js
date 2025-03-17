//En este archivo vamos a definir los servicios (ENDPOINT) y vamos a utilizar nuestro modelo para hacer operaciones
//en nuestra BDD
import express from "express";
import { Product } from "../models/product.model.js";

const router = express.Router();

//Vamos a crear el servicio que nos permite insertar un producto
//POST -> CREAR UN NUEVO RECURSO
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Crear un servicio para listar todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Servicio para consultar productos usando filtros
router.get("/by-filters", async (req, res) => {
  //Vamos a lograr que los filtros que lleguen en la petición se envien dinamicamente
  //a la consulta de MongoDB
  //query params -> /by-filters?price=500&category=tecnologia&page=1&limit=10
  //Modelo.find({ price: 500, category: "tecnologia" }).skip(0).limit(10);
  try {
    let queryObject = req.query;
    console.log(queryObject);
    const products = await Product.find(queryObject);
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Vamos a crear un servicio para obtener un producto por id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Vamos a crear un servicio para actualizar un producto por id
//La idea es retornar el producto actualizado con los nuevos valores
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Servicio para eliminar un producto por id

export default router;

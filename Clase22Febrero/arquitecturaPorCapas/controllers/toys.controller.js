//Esta capa se encarga de manejar el request que llega del cliente y darle una respuesta
//En el caso que necesitemos podemos hacer validaciones
import {
  getToys,
  saveToy,
  updateToy as updateToyService,
  deleteToy as deleteToyService,
} from "../services/toys.service.js";
import { toySchema, toyUpdateSchema } from "../schemas/toys.schema.js";

const getAllToys = async (req, res) => {
  try {
    const toys = await getToys();
    res.json(toys);
  } catch (error) {
    res.status(500).json({ message: "Algo salio mal" });
  }
};

const createToy = async (req, res) => {
  try {
    const { error } = toySchema.validate(req.body, { convert: false });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    //Vamos a llamar a la capa de servicios
    await saveToy(req.body);

    res.status(201).json({ message: "Juguete creado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Algo salio mal" });
  }
};

const updateToy = async (req, res) => {
  try {
    //Validaciones (Controllers)
    const { error } = toyUpdateSchema.validate(req.body, { convert: false });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;

    //LLamado a la capa de servicios
    const updateToyResult = await updateToyService(id, req.body);

    //Capa de controllers
    if (!updateToyResult) {
      return res.status(404).json({ message: "El juguete no existe" });
    }

    //Capa de controllers
    res.json({ message: "Juguete actualizado con exito" });
  } catch (error) {
    res.status(500).json({ message: "Algo salio mal" });
  }
};

const deleteToy = async (req, res) => {
  try {
    const id = req.params.id;
    //Llamado a la capa de servicios
    const toyDeleted = await deleteToyService(id); //Esta variable almacena si el juguete se elimino(true) o no(false)
    //Capa de controllers (validacion y dar una respuesta)
    if (!toyDeleted) {
      return res.status(404).json({
        status: "fail",
        message: "id not exist",
      });
    }

    res.end();
  } catch (error) {
    res.status(500).json({ message: "Algo salio mal" });
  }
};

export { getAllToys, createToy, updateToy, deleteToy };

//Esta capa se encarga de la difinicion de nuestros servicios
//El tipo de verbo http, la ruta y aplicacion de middlewares en caso de necesitar
//debemos utilizar Router de express
import express from "express";
import {
  getAllToys,
  createToy,
  updateToy,
  deleteToy,
} from "../controllers/toys.controller.js";

const router = express.Router();

router.get("/", getAllToys);
router.post("/", createToy);
// router.get("/:id", getToyById);
router.patch("/:id", updateToy);
router.delete("/:id", deleteToy);

export default router;

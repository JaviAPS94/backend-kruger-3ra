//Esta capa se encarga de definir el grupo de rutas asociadas al usuario y los llamados a la capa de controladores
import express from "express";
import {
  saveUser,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

//CRUD DE SERVICIOS PARA ADMINISTRAR EL USUARIO
router.post("/", saveUser); //el saveUser lo llamamos de la capa de controladores
router.get("/", getAllUsers);
// router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

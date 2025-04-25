import express from "express";
import { getAllUsers, createUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
//get user by id

export default router;

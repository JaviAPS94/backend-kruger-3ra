//Debemos definir nuestra api usando express
//Conexion a la conexion (Lllamado)
//El llamado a nuestras rutas
import express from "express";
import { connectDB } from "./db/db.js";
import productRoutes from "./routes/product.router.js";
import userRoutes from "./routes/user.router.js";

const app = express();

app.use(express.json());

connectDB();

//Vamos a definir el conjunto de rutas
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});

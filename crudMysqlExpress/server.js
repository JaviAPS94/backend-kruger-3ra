import express from "express";
import userRoutes from "./routes/users.router.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

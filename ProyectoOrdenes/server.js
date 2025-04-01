import express from "express";
import userRoutes from "./routes/user.router.js";
import authRoutes from "./routes/auth.router.js";
import { connectDB } from "./db/db.js";
import cors from "cors";

const app = express();

connectDB();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(8080);

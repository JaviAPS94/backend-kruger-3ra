import express from "express";
import userRoutes from "./routes/user.router.js";
import authRoutes from "./routes/auth.router.js";
import { connectDB } from "./db/db.js";
import configs from "./configs/configs.js";
import sendEmail from "./utils/send-email.js";

const app = express();

connectDB();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(8080);

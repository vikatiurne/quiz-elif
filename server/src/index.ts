import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import router from "./quiz-router";
import { errorHandler } from "./error-handler";

dotenv.config();

const PORT = process.env.PORT ?? 5001;

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Autorization"],
  })
);

connectDB();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

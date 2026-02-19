import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(cors)
app.use(express.json());

app.use("/auth", authRouter)

app.use(globalErrorHandler)

export default app;
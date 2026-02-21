import express from "express";
import cors from "cors";
import authRouter from "./routes/user.router";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", authRouter)

app.use(globalErrorHandler)

export default app;
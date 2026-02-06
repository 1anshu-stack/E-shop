import express from "express";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.routes';
import { globalErrorHandler } from "./middlewares/error.middleware";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

app.use(globalErrorHandler);

export default app;
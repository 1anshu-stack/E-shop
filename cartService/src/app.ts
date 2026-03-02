import express from "express";
import {globalErrorHandler} from './middleware/error.middleware';
import cors from "cors";
import * as cartController from "./controllers/cart.controllers";


const app = express();
app.use(cors());
app.use(express.json())

app.use('/cart', cartController.addToCart);

app.use(globalErrorHandler);

export default app;
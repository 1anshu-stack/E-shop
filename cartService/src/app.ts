import express from "express";
import {globalErrorHandler} from './middleware/error.middleware';
import cors from "cors";
import CartRoutes from "./routers/cart.routers"


const app = express();
app.use(cors());
app.use(express.json())

app.use('/cart', CartRoutes);


app.use(globalErrorHandler);

export default app;
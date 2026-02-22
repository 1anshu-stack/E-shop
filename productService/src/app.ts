import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import productRouter from "./routes/product.route"


const app = express();
app.use(cors);
app.use(express.json());

app.use("/products", productRouter);

app.use(globalErrorHandler);

export default app;
import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import productRouter from "./routes/product.route"
import categoryRouter from "./routes/category.route"


const app = express();
app.use(cors());
app.use(express.json());

app.use("/category/v1", categoryRouter);
app.use("/products/v1", productRouter);

app.use(globalErrorHandler);

export default app;
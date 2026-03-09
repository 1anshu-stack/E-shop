import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import productRouter from "./routes/product.route"
import categoryRouter from "./routes/category.route"


const app = express();
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
  console.log("Incoming:", req.method, req.url);
  next();
});
app.use("/category", categoryRouter);
app.use("/products", productRouter);

app.use(globalErrorHandler);

export default app;
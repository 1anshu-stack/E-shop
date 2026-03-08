import express  from "express";
import cors from "cors";
import * as orderController from "./controllers/order.controller";


const app = express();


app.use(cors());
app.use(express.json());

app.use(
  '/order',
  orderController.createOrder
)


export default app;
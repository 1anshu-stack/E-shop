import express  from "express";
import cors from "cors";
import orderRouter from "./routes/order.route";


const app = express();


app.use(cors());
app.use(express.json());

app.use(
  '/order',
  orderRouter
)


export default app;
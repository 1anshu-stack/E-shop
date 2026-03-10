import express from "express";
import cors from "cors";
import paymentRouter from "./routers/payment.route"

const app = express();

app.use(cors())
app.use(express.json());

app.use(
  '/payment',
  paymentRouter
)


export default app;
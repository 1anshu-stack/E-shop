import express from "express";
import {globalErrorHandler} from './middleware/error.middleware'


const app = express();
app.use(express.json())



app.use(globalErrorHandler);

export default app;
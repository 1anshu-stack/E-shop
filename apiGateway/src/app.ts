import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import proxyRoutes from "./routers/proxy.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

app.use('/api', proxyRoutes);


export default app;
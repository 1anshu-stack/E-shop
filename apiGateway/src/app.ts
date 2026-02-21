import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import proxyRoutes from "./routers/proxy.routes";
import {rateLimit} from "./middleware/reateLimiter.middleware"


const app = express();

app.use(cors());
app.use(rateLimit);
app.use(helmet());
app.use(morgan("combined"));

app.use('/api/v1', proxyRoutes);


export default app;
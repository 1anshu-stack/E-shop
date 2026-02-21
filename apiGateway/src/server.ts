import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
  console.log(`Api Gateway server start on port ${process.env.PORT}`)
})
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4003

app.listen(port, () => {
  console.log(`product server start on port ${port}`)
})
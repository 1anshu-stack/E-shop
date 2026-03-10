import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4006;

app.listen(port, () => {
  console.log(`Payment server start on port ${port}`);
})
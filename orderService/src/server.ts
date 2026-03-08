import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4005;

app.listen(port, () => {
  console.log(`order server start on port ${port}`)
})

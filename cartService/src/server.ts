import app from "./app"
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log(`cartService start on port ${port}`);
})


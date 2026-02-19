import app from "./app";


app.listen(process.env.PORT, () => {
  console.log(`user server start on port ${process.env.PORT}`)
})
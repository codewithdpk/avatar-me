const express = require("express");

const app = express();

const drawRoute = require("./routes/Draw");

app.use("/draw", drawRoute);

app.listen(3001, () => {
  console.log("Server is listening on 4000");
});
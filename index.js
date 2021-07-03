const express = require("express");

const app = express();

const dotEnv = require("dotenv");

dotEnv.config();

const drawRoute = require("./routes/Draw");

app.use("/draw", drawRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on 3000", process.env.PORT);
});

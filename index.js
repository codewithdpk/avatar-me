const express = require("express");

var cors = require("cors");

const app = express();

app.use(cors());

const dotEnv = require("dotenv");

dotEnv.config();

const drawRoute = require("./routes/Draw");

app.use("/draw", drawRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on 3xxx000", process.env.PORT);
});

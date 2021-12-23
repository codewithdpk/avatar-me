const express = require("express");

const router = express.Router();

const { createCanvas, registerFont } = require("canvas");
registerFont("baloobold.ttf", { family: "Baloo 2" });

const width = 600;
const height = 600;

router.get("/", (req, res) => {
  let backGroundColor = req.query.background
    ? `#${req.query.background}`
    : `#E7F7FF`;

  if (req.query.mode && req.query.mode == "short") {
    let firstName = req.query.firstName.charAt(0);
    let lastName = req.query.lastName.charAt(0);
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    drawCanvaShort(context, backGroundColor, firstName, lastName);

    res.setHeader("Content-Type", "image/png");
    canvas.pngStream().pipe(res);
  } else {
    let firstName = repeatChar(req.query.firstName, 6);
    let lastName = repeatChar(req.query.lastName, 6);
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    drawCanva(context, backGroundColor, firstName, lastName);

    res.setHeader("Content-Type", "image/png");
    canvas.pngStream().pipe(res);
  }
});

const drawCanva = (context, backGroundColor, firstName, lastName) => {
  context.fillStyle = backGroundColor;
  context.fillRect(0, 0, width, height);

  context.font = "bold 130pt Baloo 2";
  context.textAlign = "center";
  context.fillStyle = "#4280FD";
  context.fillText(firstName, 300, 300);

  context.fillStyle = "#3FCC5E";
  context.textAlign = "center";
  context.font = "bold 100pt Baloo 2";
  context.fillText(lastName, 300, 450);
};

const drawCanvaShort = (context, backGroundColor, firstName, lastName) => {
  context.fillStyle = backGroundColor;
  context.fillRect(0, 0, width, height);

  context.font = "bold 240pt Open Sans";
  context.textAlign = "center";
  context.fillStyle = "#4280FD";
  context.fillText(`${firstName}${lastName}`, 300, 400);
};
const getRandomColor = () => {
  var trans = "0.1"; // 50% transparency
  var color = "rgba(";
  for (var i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ",";
  }
  color += trans + ")"; // add the transparency
  return color;
};

const repeatChar = (ch, length) => {
  return ch ? ch.substr(0, length) : "Store";
  //return ch.splice(1, 6);
};

module.exports = router;

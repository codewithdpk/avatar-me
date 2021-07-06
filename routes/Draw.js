const express = require("express");

const router = express.Router();

var xmlserializer = require("xmlserializer");

var Canvas = require("node-canvas");

var parser = require("parse5");

function getFormattedImage(req) {
  let backGroundColor = req.query.background
    ? `#${req.query.background}`
    : getRandomColor();

  let firstName = repeatChar(req.query.firstName, 8);
  let lastName = repeatChar(req.query.lastName, 8);
  let image = `
    <svg id = "my-svg" width="500" height="500" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"" >
   
    <g>
    <rect x="10" y="50"  width="500" height="500"
    style="fill:${backGroundColor};stroke-width:5;opacity:1" />
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" style = "font-family:'Baloo 2'; font-weight:900" font-size="120" fill="#4280FD">${firstName}</text>   
    <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" style = "font-family:'Baloo 2'; font-weight:normal" font-size="100" fill="#3FCC5E">${lastName}</text>   
    </g>
    </svg>
    `;

  return image;
}

router.get("/", async (req, res) => {
  console.log(req.query);
  //   res.setHeader("Content-Type", "image/svg+xml");
  let formattedImage = getFormattedImage(req);
  draw(formattedImage, res);

  // let base64Image =
  //   `data:image/jpeg;base64,` + Buffer.from(formattedImage).toString("base64");

  // res.writeHead(200, {
  //   "Content-Type": "image/png",
  //   "Content-Length": base64Image.length,
  // });
  // res.end(base64Image);
});

const draw = async (svg, res) => {
  // var svg = document.querySelector("svg");
  // var img = document.querySelector("img");
  // var canvas = document.querySelector("canvas");

  var canvas = Canvas.createCanvas(500, 500, "svg");

  var image = Canvas.Image;

  var img = new image();
  // get svg data

  var dom = parser.parse(svg);

  var xml = xmlserializer.serializeToString(dom);

  // make it base64
  var svg64 = await Buffer.from(svg).toString("base64");
  var b64Start = "data:image/svg+xml;base64,";

  // prepend a "header"
  // var image64 = b64Start + svg64;

  // var ctx = canvas.getContext("2d");

  // img.src = image64;
  res.send({ image: svg64 });

  // img.onload = function () {
  //   ctx.drawImage(img, 0, 0); // Or at whatever offset you like
  // };

  // set it as the source of the img element

  // res.setHeader("Content-Type", "image/png");
  // //canvas.pngStream().pipe(res);
  // res.send(canvas.toDataURL("image/png"));
  //res.send(canvas);
};

{
  /* <style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap")
</style> */
}

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
  return ch ? ch.substr(0, length) : "Demo";
  //return ch.splice(1, 6);
};

module.exports = router;

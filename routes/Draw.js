const express = require("express");

const router = express.Router();

const name = "Deepak";
router.get("/", (req, res) => {
  console.log(req.query);

  let backGroundColor = req.query.background
    ? `#${req.query.background}`
    : getRandomColor();

  let firstName = repeatChar(req.query.firstName, 8);
  let lastName = repeatChar(req.query.lastName, 8);
  res.send(`
    <html>
    <head>
    
    <title> SVG Generator </title>
    </head>
    
    <body>

    <svg width="500" height="500">
   
    
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap");
    </style>
    <g>
    <rect x="10" y="50"  width="500" height="500"
    style="fill:${backGroundColor};stroke-width:5;opacity:1" />
 
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" style = "font-family:'Baloo 2'; font-weight:900" font-size="120" fill="#4280FD">${firstName}</text>   
    <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" style = "font-family:'Baloo 2'; font-weight:normal" font-size="100" fill="#3FCC5E">${lastName}</text>   
    
    </g>
        </svg>

    
    </body>
    </html>
    
    `);
});

{
  /* <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /> */
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
  return ch.substr(0, length);
  //return ch.splice(1, 6);
};

module.exports = router;

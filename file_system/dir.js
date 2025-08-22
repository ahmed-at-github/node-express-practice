const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "./newDir"))) {
  fs.mkdir(path.join(__dirname, "./newDir"), (err) => {
    if (err) throw err;
    console.log("directory created");
  });
} else console.log("directory exists");

if (fs.existsSync(path.join(__dirname, "./newDir"))) {
  fs.rmdir(path.join(__dirname, "./newDir"), (err) => {
    if (err) throw err;
    console.log("directory removed");
  });
} else console.log("directory doesnt exists, so cant be removed");

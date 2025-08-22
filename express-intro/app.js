const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 1660;

app.get("/", (req, res) => {
  console.log("GET");
  res.sendFile(path.join(__dirname, "views", "index.html"));
  //   res.send("Hello Server");
});

app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.html", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default
});

// chaining route handler chain: only send a response once, and call next() before sending
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain", [one, two, three]);



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

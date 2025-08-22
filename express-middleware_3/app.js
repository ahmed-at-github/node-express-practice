const path = require("path");
const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const PORT = process.env.PORT || 1660;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    const allowed = whitelist.includes(origin) || !origin;
    callback(allowed ? null : new Error("Not allowed by CORS"), allowed);
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// OR
// app.use(cors({ origin: 'https://www.yoursite.com' }));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  console.log("GET");
  res.sendFile(path.join(__dirname, "views", "index.html"));
  //   res.send("Hello Server");
});

app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page", (req, res) => {
  res.redirect(301, "/new-page"); // 302 by default, now redirects to the correct route
});

app.use((req, res) => {
  // res.send("not found");
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

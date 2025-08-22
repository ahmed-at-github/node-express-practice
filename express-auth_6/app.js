const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const empRouter = require("./routes/api/employees");
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth")
const notFound = require("./controllers/notFoundController");
const PORT = process.env.PORT || 1660;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// OR
// app.use(cors({ origin: 'https://www.yoursite.com' }));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//routes
app.use("/register", registerRouter);
app.use("/auth", authRouter);


//404 not found
app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

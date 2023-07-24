const express = require("express");
const app = express();
const morgan = require("morgan");
var bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 4,
  message: "To many request. Please try again later",
});

const isLoggedIn = (req, res, next) => {
  const login = true;
  if (login) {
    next();
  } else {
    return res.status(401).json({ message: "please login first" });
  }
};

// middleware
app.use(isLoggedIn);
app.use(limiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to E-commerce saiful project",
  });
});

app.get("/products", (req, res) => {
  res.status(200).send({
    message: "Products are returned",
  });
});

app.use("/api/users", userRouter);

app.use("/api/seed", seedRouter);

// client error handling
app.use((req, res, next) => {
  next(createError(404, "Error! route not found"));
});

// server error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;

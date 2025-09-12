const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes"); // contains /users and /items routes

const errorHandler = require("./middlewares/error-handler");
const { NotFoundError } = require("./utils/customErrors");

const app = express();
const { PORT = 3001 } = process.env;
// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(helmet()); // help protect from web vulnerabilities by setting HTTP headers appropriately
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Request logger - 1st after basic setup
app.use(requestLogger);

// Main router handles all API routes
app.use("/", mainRouter);

// Error logger - after routes, before error handlers
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Not found router handler for non-existent routes
app.use((req, res) => {
  res.status(NotFoundError).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

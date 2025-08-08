const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes"); // contains /users and /items routes
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth"); // Middleware for authentication

const { NOT_FOUND } = require("./utils/errors");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json()); // Middleware to parse JSON bodies
// Public routes for login and signup
app.post("/signin", login);
app.post("/signup", createUser);
// Protected routes that require authentication
app.use(auth);
app.use("/items", require("./routes/clothingItems"));

app.use("/", mainRouter);
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors());

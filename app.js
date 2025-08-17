const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");

const auth = require("./middlewares/auth"); // Middleware for authentication
const mainRouter = require("./routes"); // contains /users and /items routes

const { NOT_FOUND } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;
// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

// Public routes for login and signup
app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

// Protected routes that require authentication
app.use(auth);
app.use("/", mainRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

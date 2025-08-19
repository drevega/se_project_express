const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

const auth = require("../middlewares/auth");

// Public routes
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", getItems);

// Protected routes that require authentication
router.use(auth);
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;

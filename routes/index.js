const router = require("express").Router();
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// POST handlers for /signin and /signup routes
router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", clothingItemsRouter);

// Protected routes that require authentication
router.use(auth);
router.use("/users", userRouter);

module.exports = router;

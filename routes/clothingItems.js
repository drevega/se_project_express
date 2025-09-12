const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
  getItems,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateClothingItemBody,
  validateId,
} = require("../middlewares/validation");

// GET all items (no validation needed)
router.get("/", getItems);

// All routes here are protected by the auth middleware
// POST a new item (validate body)
router.post("/", auth, validateClothingItemBody, createItem);
// DELETE an item (validate the ID in params)
router.delete("/:itemId", auth, validateId, deleteItem);
// PUT to like an item (validate the ID in params)
router.put("/:itemId/likes", auth, validateId, likeItem);
// DELETE to dislike on items (validate the ID in param)
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;

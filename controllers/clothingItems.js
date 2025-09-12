const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/customErrors");

// get items - does not need 'next' if error is 500
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next); // passed any error directly to handler
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        // used next() with custom error
        return next(new BadRequestError("Invalid item data"));
      }
      // passed any other error to defaulf 500 handler
      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Who's trying to delete the item?

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      // does the item belong to the user?
      if (item.owner.toString() !== userId) {
        // Nope! throw forbidden error
        throw new ForbiddenError(
          "You do not have permission to delete this item."
        );
      }
      // If owner, delete the item
      return item.deleteOne().then(() => {
        res.status(200).send({ message: "Item deleted", item });
      });
    })
    .catch((err) => {
      // console.error(err.name);
      if (err.name === "DocumentNotFoundError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      // catch above forbidden error
      if (err.name === "ForbiddenError") {
      }
      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item Id format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

module.exports = { createItem, deleteItem, likeItem, dislikeItem, getItems };

const express = require("express");
const {
  userController,
  getUserController,
  deleteItem,
} = require("../controllers/controller");

const userRouter = express.Router();

userRouter.get("/", userController);
userRouter.get("/:id", getUserController);
userRouter.delete("/:id", deleteItem);

userRouter.get("/profile", userController);

module.exports = userRouter;

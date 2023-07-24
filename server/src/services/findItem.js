const createError = require("http-errors");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const findWithId = async (id) => {
  try {
    const options = { password: 0 };

    const item = await User.findById(id, options);
    if (!item) throw createError(404, "No item found");
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "Invalid item id");
    }
    throw error;
  }
};

module.exports = { findWithId };

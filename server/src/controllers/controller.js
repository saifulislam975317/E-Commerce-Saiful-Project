const mongoose = require("mongoose");
const User = require("../models/userModel");

const createError = require("http-errors");
const { findWithId } = require("../services/findItem");

const userController = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      // $or: [
      //   { name: { $regex: searchRegExp } },
      //   { email: { $regex: searchRegExp } },
      //   { phone: { $regex: searchRegExp } },
      // ],
    };

    const option = { password: 0 };

    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();

    if (!users) throw createError(404, "No user found");

    res.status(200).send({
      message: "users were returned",
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findWithId(id);

    res.status(200).send({
      message: "user was returned by Id",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await findWithId(id);

    res.status(200).send({
      message: "user was returned by Id",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { userController, getUserController, deleteItem };

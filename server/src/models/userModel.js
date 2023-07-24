const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userImagePath } = require("../secret");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: [5, "Minimum length must be at least 5 characters"],
      maxLength: [16, "Maximum length must be 16 characters"],
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      trim: true,
      unique: true,
      lowerCase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
      },
    },
    password: {
      type: String,
      required: [true, "user password is required"],
      minLength: [6, "Minimum length must be at least 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    address: {
      type: String,
      required: [true, "user address is required"],
    },
    phone: {
      type: Number,
      required: [true, "user phone is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: userImagePath,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;

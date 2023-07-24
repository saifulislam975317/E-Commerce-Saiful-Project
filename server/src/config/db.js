const mongoose = require("mongoose");
const { mongodbUrl } = require("../secret");

const connectDatabase = async (option = {}) => {
  try {
    await mongoose.connect(mongodbUrl, option);
    console.log("connection to db is successfully");

    mongoose.connection.on("error", (error) => {
      console.error("db connection error", error);
    });
  } catch (error) {
    console.error("could not connect to db", error.toString());
  }
};

module.exports = connectDatabase;

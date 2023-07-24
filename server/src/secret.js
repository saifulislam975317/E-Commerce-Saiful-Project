require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbUrl =
  process.env.MONGODB_ATLAS_URL ||
  "mongodb://localhost:27017/ecommerceSaifulDB";

const userImagePath =
  process.env.USER_IMAGE_PATH || "public/images/user/logo.jpg";

module.exports = { serverPort, mongodbUrl, userImagePath };

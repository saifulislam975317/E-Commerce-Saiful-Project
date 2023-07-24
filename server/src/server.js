const app = require("./app");
const connectDatabase = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort, () => {
  console.log(`server is running at http://localhost:${serverPort}`);
  connectDatabase();
});

require("dotenv").config({ path: "./.env" });


const db = require("./src/db/db");
const app = require("./src/app");

app.listen(3000, () => {
  console.log("Server is runing : http://localhost:3000 ");
});

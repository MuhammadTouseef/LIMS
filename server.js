const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const dbcon = require("./config/db");

dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
console.log(dbcon(``));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`.green.bold);
});

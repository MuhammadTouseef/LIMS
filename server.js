const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const dbcon = require("./config/db");
const cookieParser = require('cookie-parser');
const errorHandler = require("./middlewear/error");
var cors = require('cors')




// Importing Routes
const auth = require('./routes/auth');

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors())
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}


// Body Prase
app.use(express.json());

app.use(cookieParser())


// Routes Mount

app.use('/api/v1/auth', auth)

//app.use('api/v1/auth', a)
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`.green.bold);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});


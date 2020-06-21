const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/clams";
const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });

// this is hosted on heroku right now and should be directed there?
// issues with installing mongoose  Also, how to tell if everything installed correctly?

mongoose.connect(
  MONGODB_URI,
  // process.env.MONGODB_URI ||
  //   "mongodb://clams:5clams@ds253408.mlab.com:53408/heroku_5j8zjng2",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

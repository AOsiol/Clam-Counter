const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// const PORT = 3000;
const PORT = process.env.PORT || 3000;
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
  process.env.MONGODB_URI || "mongodb://localhost/clams",
  // "mongodb://clams:5clams@ds253408.mlab.com:53408/heroku_5j8zjng2",
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

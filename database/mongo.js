

const MONGODB_URI;
// Connect to mongo
// const config = require("../utils/config");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

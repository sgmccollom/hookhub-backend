// using Mai's mongo Atlas here. may change later
// const username = 'team-8'
// const password = "secret12345"
// const collectionName = "Logs"
// const mongoURL = `mongodb+srv://${username}:${password}@cluster0.ze8g2xm.mongodb.net/${collectionName}?retryWrites=true&w=majority`

const MONGODB_URI = "mongodb+srv://sgmcm-fullstack:U2r8OXdPl8EJBmAR@cluster0.tvfzl43.mongodb.net/requestbin?retryWrites=true&w=majority";
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
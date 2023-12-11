const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const newSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  // office: {
  //   name: String,
  //   require: true,
  // },
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;

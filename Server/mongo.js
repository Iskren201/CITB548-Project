const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
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
});

const shipmentSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;

const collection = mongoose.model("collection", newSchema);

module.exports = collection;

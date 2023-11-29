const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
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

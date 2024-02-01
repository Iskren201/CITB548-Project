const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
  name: String,
  location: String,
  // Add other fields as needed
  office: {
    type: String,
    required: true,
  },
});

const Office = mongoose.model("Office", officeSchema);

module.exports = Office;

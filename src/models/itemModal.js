const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  qty: Number,
  price: Number,
  image: String,
  issueDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);

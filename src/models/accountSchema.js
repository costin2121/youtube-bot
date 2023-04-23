const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: String, required: true },
  guild: { type: String, required: true },
  coins: { type: Number, default: 100 },
  bank: { type: Number, default: 0 },
});

module.exports = mongoose.model("Account", accountSchema, "accounts");

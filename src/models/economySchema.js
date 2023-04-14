const mongoose = require("mongoose");

const economySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, required: true },
  guildId: { type: String, required: true },
  coins: { type: Number, default: 100 },
  bank: { type: Number, default: 0 },
});

module.exports = mongoose.model("Economy", economySchema, "economies");

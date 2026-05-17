const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  query: String,
  status: { type: String, default: "Open" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);
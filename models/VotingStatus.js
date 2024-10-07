const mongoose = require("mongoose");

const votingStatusSchema = new mongoose.Schema({
  status: { type: String, enum: ["started", "stopped"], default: "stopped" },
});

const VotingStatus = mongoose.model("VotingStatus", votingStatusSchema);
module.exports = VotingStatus;

const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const VotingStatus = require("../models/VotingStatus");

// API to start or stop voting
router.post("/setVotingStatus", async (req, res) => {
  const { status } = req.body;

  try {
    // Ensure status is either 'started' or 'stopped'
    if (!["started", "stopped"].includes(status)) {
      return res.status(400).json({ message: "Invalid voting status" });
    }

    // Update voting status in the database
    let votingStatus = await VotingStatus.findOne({});
    if (!votingStatus) {
      votingStatus = new VotingStatus({ status });
    } else {
      votingStatus.status = status;
    }

    await votingStatus.save();

    // If voting is started, reset all candidate votes
    if (status === "started") {
      await Candidate.updateMany({}, { vote: 0 });
    }

    res.status(200).json({ message: `Voting ${status}`, votingStatus });
  } catch (error) {
    console.error("Error setting voting status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

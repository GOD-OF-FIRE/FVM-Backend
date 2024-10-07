const express = require("express");
const router = express.Router();
const VotingStatus = require("../models/VotingStatus"); // Assuming the model is named VotingStatus

// Route to get the current voting status
router.get("/getVotingStatus", async (req, res) => {
  try {
    const votingStatus = await VotingStatus.findOne(); // Fetch the latest voting status (there should be only one)

    if (!votingStatus) {
      return res.status(404).json({ message: "Voting status not found" });
    }

    res.status(200).json({ status: votingStatus.status });
  } catch (error) {
    console.error("Error fetching voting status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// In-memory tracking of users who have already voted
const voters = new Set(); // A Set is used to store unique usernames

// Route to cast a vote
router.post("/vote", async (req, res) => {
  const { username, candidateName } = req.body;

  try {
    // Check if the user has already voted
    if (voters.has(username)) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    // Find the candidate by name
    const candidate = await Candidate.findOne({ name: candidateName });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Increment the candidate's vote count
    candidate.vote += 1;
    await candidate.save();

    // Add the user to the set of voters (prevent them from voting again)
    voters.add(username);

    res.status(200).json({ message: "Vote cast successfully!", candidate });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

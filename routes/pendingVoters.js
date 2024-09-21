const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to get all voters with pending status
router.get("/pending-voters", async (req, res) => {
  try {
    // Fetch users with role "voter" and status "pending"
    const pendingVoters = await User.find({ role: "voter", status: "pending" });

    // Return the list of pending voters
    res.status(200).json(pendingVoters);
  } catch (error) {
    console.error("Error fetching pending voters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

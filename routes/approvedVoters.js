const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to get all voters with pending status
router.get("/approved-voters", async (req, res) => {
  try {
    const approvedVoters = await User.find({ role: "voter", status: "approved" });

    // Return the list of pending voters
    res.status(200).json(approvedVoters);
  } catch (error) {
    console.error("Error fetching pending voters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

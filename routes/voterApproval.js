const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to approve a voter by updating their status
router.put("/approve-voter/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and update the status to "approved"
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: "approved" }, // Update status to "approved"
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Voter approved", user: updatedUser });
  } catch (error) {
    console.error("Error approving voter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

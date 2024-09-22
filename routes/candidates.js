const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// Route to create a new candidate
router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Candidate name is required" });
    }

    const newCandidate = new Candidate({ name, vote: 0 });
    await newCandidate.save();

    res.status(201).json({ message: "Candidate created successfully", candidate: newCandidate });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

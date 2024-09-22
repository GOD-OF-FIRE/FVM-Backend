const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

router.get("/candidateList", async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching Candidate List:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;


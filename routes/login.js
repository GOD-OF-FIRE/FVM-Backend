const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

const JWT_SECRET = "godoffire";  

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET,                         
      { expiresIn: "1h" }                 
    );

    // Send response based on user's role and status
    if (user.role === "admin") {
      return res.status(200).json({ message: "Login successful", role: "admin", token });
    } else if (user.role === "voter" && user.status === "approved") {
      return res.status(200).json({ message: "Login successful", role: "voter", status: "approved", token });
    } else if (user.role === "voter" && user.status === "pending") {
      return res.status(403).json({ message: "Voter approval pending" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

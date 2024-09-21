// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, gender, dob, username, password } = req.body;

    console.log("Received data:", req.body); // Log the received data

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if any user exists in the database
    const usersCount = await User.countDocuments();

    let role = "voter";
    let status = "pending";

    if (usersCount === 0) {
      // First user becomes admin and is auto-approved
      role = "admin";
      status = "approved";
    }

    // Create and save the new user
    const user = new User({
      firstName,
      lastName,
      gender,
      dob,
      username,
      password,
      role,
      status,
    });

    await user.save();

    console.log("User registered successfully:", user); // Log the created user
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;

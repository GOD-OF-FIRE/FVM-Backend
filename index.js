// index.js or app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const authRoutes = require("./routes/auth");
const loginRoutes = require("./routes/login");
const pendingVotersRoutes = require("./routes/pendingVoters"); 
const approvedVotersRoutes = require("./routes/approvedVoters"); 
const voterApprovalRoutes = require("./routes/voterApproval");
const createCandidateRoutes = require("./routes/candidates");
const candidateRoutes = require("./routes/getCandidate");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/auth", authRoutes); // Register the authentication routes
app.use("/api/auth", loginRoutes);
app.use("/api/admin", pendingVotersRoutes);
app.use("/api/admin", approvedVotersRoutes);
app.use("/api/admin", voterApprovalRoutes);
app.use("/api/admin", createCandidateRoutes);
app.use("/api/admin", candidateRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

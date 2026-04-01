const express = require("express");
const router = express.Router();

// POST route for adding courses
router.get("/api/courses", (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
    res.json({ message: "Course received", course: req.body });
  } catch (error) {
    res.status(500).json({ error: "Invalid JSON input" });
  }
});

module.exports = router;

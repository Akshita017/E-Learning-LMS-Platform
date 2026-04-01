const express = require("express");
const router = express.Router();
const {
  getUserData,
  getUserById,
  createUser,
  updateUserData,
  deleteUser
} = require("../controller/userController");

// CRUD Routes
router.get("/", getUserData);        // READ - Get all users
router.get("/:id", getUserById);     // READ - Get a single user by ID
router.post("/", createUser);        // CREATE - Add new user
router.put("/:id", updateUserData);  // UPDATE - Update user data
router.delete("/:id", deleteUser);   // DELETE - Remove a user

module.exports = router;

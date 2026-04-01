const fs = require("fs");
const { usersFilePath } = require("../utils/fileHelper");

// Utility function to read user data
const readUserData = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data) || [];
  } catch (err) {
    return [];
  }
};

// Utility function to write user data
const writeUserData = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), "utf8");
};

// **1. Get All Users**
const getUserData = (req, res) => {
  const users = readUserData();
  res.json(users);
};

// **2. Get a Single User by ID**
const getUserById = (req, res) => {
  const users = readUserData();
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user);
};

// **3. Create a New User**
const createUser = (req, res) => {
  const users = readUserData();
  const newUser = { id: Date.now(), ...req.body };

  users.push(newUser);
  writeUserData(users);

  res.status(201).json({ message: "User created successfully", user: newUser });
};

// **4. Update User Data**
const updateUserData = (req, res) => {
  const users = readUserData();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  // Update user data
  users[userIndex] = { ...users[userIndex], ...req.body };
  writeUserData(users);

  res.json({ message: "User updated successfully", user: users[userIndex] });
};

// **5. Delete a User**
const deleteUser = (req, res) => {
  let users = readUserData();
  const filteredUsers = users.filter((u) => u.id !== parseInt(req.params.id));

  if (users.length === filteredUsers.length) {
    return res.status(404).json({ error: "User not found" });
  }

  writeUserData(filteredUsers);
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  getUserData,
  getUserById,
  createUser,
  updateUserData,
  deleteUser,
};

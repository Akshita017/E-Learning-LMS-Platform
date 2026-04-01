const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, "../data/users.json");
const otpFilePath = path.join(__dirname, "../data/otp.json");

const ensureFileExists = (filePath, defaultValue) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), "utf8");
  }
};

ensureFileExists(userFilePath, []);
ensureFileExists(otpFilePath, {});

// ✅ Corrected loadUsers function
const loadUsers = () => {
  try {
    const data = fs.readFileSync(userFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading users:", error);
    return []; // Return an empty array in case of error
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), 'utf8');
};

module.exports = {
  loadUsers,
  saveUsers,
  userFilePath,
};

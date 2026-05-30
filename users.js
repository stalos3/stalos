const express = require('express');
const router = express.Router();

// Updated user routes
let users = [];

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Add a new user
router.post('/', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password, role: role || 'Admin' });
    res.status(201).json({ message: 'User added successfully' });
});

// Edit a user
router.put('/:username', (req, res) => {
    const { username } = req.params;
    const { newUsername, newPassword, newRole } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (newUsername) user.username = newUsername;
    if (newPassword) user.password = newPassword;
    if (newRole) user.role = newRole;
    res.json({ message: 'User updated successfully' });
});

// Delete a user
router.delete('/:username', (req, res) => {
    const { username } = req.params;
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;
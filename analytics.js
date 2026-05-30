const express = require('express');
const router = express.Router();

// Updated analytics routes
const analyticsData = {
    users: 10,
    contentUpdates: 5,
    images: 20
};

// Get analytics data
router.get('/', (req, res) => {
    res.json(analyticsData);
});

module.exports = router;
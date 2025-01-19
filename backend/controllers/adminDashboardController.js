const db = require('../db');

// to get total number of books
exports.getTotalBooks = async (req, res) => {
    try {
        const query = "SELECT COUNT(*) AS totalBooks FROM books";
        const [results] = await db.execute(query);
        res.json({ totalBooks: results[0].totalBooks });
    } catch (err) {
        res.status(500).json([]);
    }
};

// to get total number of users
exports.getTotalUsers = async (req, res) => {
    try {
        const query = "SELECT COUNT(*) AS totalUsers FROM members";
        const [results] = await db.execute(query);
        res.json({ totalUsers: results[0].totalUsers });
    } catch (err) {
        res.status(500).json([]);
    }
};

// not used
exports.getBooksDue = async (req, res) => {
    try {
        const query = "SELECT COUNT(*) AS booksDue FROM transaction WHERE DueDate = CURDATE() AND ReturnedStatus = 'Not Return'";
        const [results] = await db.execute(query);
        res.json({ booksDue: results[0].booksDue });

    } catch (err) {
        res.status(500).json([]);
    }
};

// Get total number of books not returned
exports.getNotReturnedBooks = async (req, res) => {
    try {
        const query = "SELECT COUNT(*) AS notreturned FROM transaction WHERE ReturnedStatus = 'Not Return'";
        const [results] = await db.execute(query);
        res.json({ notreturned: results[0].notreturned });
    } catch (err) {
        res.status(500).json([]);
    }
};
const db = require('../db');

exports.getBooksDueForReturn = async (req, res) => {
    try {
        const today = new Date().toISOString().slice(0, 10);
        const query = `
            SELECT 
                t.ID AS TransactionID,
                t.DueDate,
                t.ReturnedStatus,
                t.BookID,
                t.MemberID,
                b.Title AS BookName,
                m.Name AS MemberName
            FROM transaction t
            INNER JOIN books b ON t.BookID = b.BookID
            INNER JOIN members m ON t.MemberID = m.ID
            WHERE t.DueDate <= ? AND t.ReturnedStatus = 'Not Return'
        `;
        const [results] = await db.execute(query, [today]);

        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

exports.notifyUser = async (req, res) => {
    try {
        const { MemberID, BookID, BookName } = req.body;
        const today = new Date().toISOString().slice(0, 10);

        const message = `Your borrowed book, "${BookName}", is due for return. Please return it as soon as possible.`;

        const checkQuery = `
            SELECT * FROM notification
            WHERE MemberID = ? AND BookID = ?
        `;
        const [existingNotification] = await db.execute(checkQuery, [MemberID, BookID]);

        if (existingNotification.length > 0) {
            return res.status(400).json({ message: 'Notification already sent for this User' });
        }

        const query = `
            INSERT INTO notification (MemberID, BookID, NotificationDate, Message)
            VALUES (?, ?, ?, ?)
        `;
        await db.execute(query, [MemberID, BookID, today, message]);

        res.status(200).json({ message: 'Notification added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
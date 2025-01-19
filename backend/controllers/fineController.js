const db = require('../db');

exports.getFines = async (req, res) => {
  try {
    const query = `
        SELECT 
          f.ID AS FineID, 
          f.Amount, 
          f.PaymentStatus, 
          f.MemberID, 
          m.Name, 
          f.BookID, 
          b.Title AS BookName, 
          t.DueDate
        FROM fine f
        JOIN members m ON f.MemberID = m.ID
        JOIN books b ON f.BookID = b.BookID
        JOIN transaction t ON f.MemberID = t.MemberID AND f.BookID = t.BookID
        WHERE f.PaymentStatus = FALSE
      `;
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.notifyUser = async (req, res) => {
  try {
    const { MemberID, BookID, BookName, Amount, DueDate } = req.body;
    const today = new Date().toISOString().slice(0, 10);
    const message = `You have an unpaid fine of ₹${Amount} for the book "${BookName}". Please pay the fine to avoid further penalties.`;
    const checkQuery = `
        SELECT * FROM notification
        WHERE MemberID = ? AND BookID = ? AND Message LIKE ?
      `;
    const [existingNotification] = await db.execute(checkQuery, [MemberID, BookID, `%₹${Amount}%`]);
    if (existingNotification.length > 0) {
      return res.status(400).json({ message: 'Fine notification already sent for this user and book.' });
    }
    const query = `
        INSERT INTO notification (MemberID, BookID, NotificationDate, Message)
        VALUES (?, ?, ?, ?)
      `;
    await db.execute(query, [MemberID, BookID, today, message]);
    res.status(200).json({ message: 'Fine notification added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
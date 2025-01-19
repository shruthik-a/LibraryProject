//checked
const db = require('../db');

//get all the books the member got
exports.getBorrowedBooks = async (req, res) => {
    const userId = req.params.userId;
    try {
        const query = `
      SELECT b.BookID, b.Title, t.IssuedDate, t.DueDate, t.ReturnedDate, t.IsDelayed, t.IsDamaged,t.ReturnedStatus
      FROM transaction t
      JOIN books b ON t.BookID = b.BookID
      WHERE t.MemberID = ?
    `;
        const [borrowedBooks] = await db.execute(query, [userId]);
        res.status(200).json(borrowedBooks);
    } catch (err) {
        res.status(500).json([]);
    }
};

//get fines for a member
exports.getFines = async (req, res) => {
    const userId = req.params.userId;
    try {
        const query = `
      SELECT f.ID, f.Amount, f.PaymentStatus, f.BookID
      FROM fine f
      JOIN transaction t ON f.BookID = t.BookID
      WHERE t.MemberID = ?
    `;
        const [fines] = await db.execute(query, [userId]);
        res.status(200).json(fines);
    } catch (err) {
        res.status(500).json([]);
    }
};
const db = require('../db');

//used
//for getting user details
exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM members WHERE ID = ?";
    const [result] = await db.execute(query, [id]);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json([]);
  }
};

//used
//for getting all the books
exports.fetchBooks = async (req, res) => {
  try {
    const query = `
          SELECT b.BookID, b.Title, b.Language, b.PublishedYear,b.CopiesAvailable,
                 a.AuthorName, c.CategoryName, b.image,b.TotalCopies,b.Status
          FROM books b
          JOIN authors a ON b.AuthorID = a.AuthorID
          JOIN category c ON b.CategoryID = c.CategoryID;
        `;
    const [results] = await db.execute(query);
    res.json(results);
  } catch (err) {
    res.status(500).json([]);
  }
};

//used
//for getting maximumbook count for user
exports.getMaximumBookCount = async (req, res) => {
  const userId = req.params.id;
  try {
    const query = `
              SELECT p.MaxBookAllowed
              FROM members m
              JOIN plan p ON m.PlanID = p.ID
              WHERE m.ID = ?;
          `;
    const [result] = await db.query(query, [userId]);
    res.json(result);
  } catch (error) {
    res.status(500).json([]);
  }
};

//used
//for getting the books borrowed by the user
exports.getBorrowedBooks = async (req, res) => {
  const memberId = req.params.id;
  try {
    const query = `
            SELECT t.BookID, b.Title, b.Image, t.IssuedDate, t.DueDate
            FROM transaction t
            JOIN books b ON t.BookID = b.BookID
            WHERE t.MemberID = ? AND t.ReturnedStatus != 'Returned';
        `;
    const [results] = await db.query(query, [memberId]);
    // if (results.length > 0) {
    res.json(results);
    // } else {
    //   res.json([]);
    // }
  } catch (error) {
    res.status(500).json([]);
  }
};

//used
//for adding the books borrowed
exports.addTransaction = async (req, res) => {
  const {
    BookID,
    MemberID,
    IssuedDate,
    DueDate,
    ReturnedDate,
    ReturnedStatus,
    IsDelayed,
    IsDamaged
  } = req.body;
  try {
    const query = `
      INSERT INTO transaction 
      (BookID, MemberID, IssuedDate, DueDate, ReturnedDate, ReturnedStatus, IsDelayed, IsDamaged)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const result = await db.query(query, [
      BookID,
      MemberID,
      IssuedDate,
      DueDate,
      ReturnedDate,
      ReturnedStatus,
      IsDelayed,
      IsDamaged
    ]);
    const updateQuery = `
      UPDATE books 
      SET CopiesAvailable = CopiesAvailable - 1 
      WHERE BookID = ?
    `;
    const [updateResult] = await db.query(updateQuery, [BookID]);
    res.status(201).json({ message: 'Transaction added successfully' });
  } catch (error) {
    res.status(500).json([]);
  }
};

//remove books from the list
//used
exports.removeBook = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const deleteQuery = 'DELETE FROM transaction WHERE BookID = ? AND MemberID = ?';
    const [deleteResult] = await db.query(deleteQuery, [bookId, userId]);
    const updateQuery = 'UPDATE books SET CopiesAvailable = CopiesAvailable + 1 WHERE BookID = ?';
    const [updateResult] = await db.query(updateQuery, [bookId]);
    res.status(200).json({ message: 'Book removed.' });
  } catch (error) {
    res.status(500).json([]);
  }
};

// //used
exports.getFines = async (req, res) => {
  try {
    const userId = req.params.userId;
    const fineRate = 30;
    const query = `
          SELECT t.ID AS TransactionID, t.BookID, b.Title AS bookTitle, t.DueDate, t.ReturnedDate,
              CASE 
                  WHEN t.ReturnedDate IS NULL AND CURRENT_DATE > t.DueDate 
                  THEN DATEDIFF(CURRENT_DATE, t.DueDate) * ? 
                  ELSE 0 
              END AS fineAmount
          FROM transaction t
          JOIN books b ON t.BookID = b.BookID
          WHERE t.MemberID = ? AND t.DueDate IS NOT NULL
      `;
    const [transactions] = await db.query(query, [fineRate, userId]);
    const fines = [];
    for (const transaction of transactions.filter(t => t.BookID && t.fineAmount !== null)) {
      if (transaction.fineAmount > 0) {
        const fineQuery = 'SELECT * FROM fine WHERE MemberID = ? AND BookID = ?';
        const [existingFine] = await db.query(fineQuery, [userId, transaction.BookID]);
        if (existingFine.length > 0) {
          const fine = existingFine[0];
          fines.push({
            fineId: fine.ID,
            bookTitle: transaction.bookTitle,
            fineAmount: fine.Amount,
            paidStatus: fine.PaymentStatus,
            dueDate: transaction.DueDate,
          });
        } else {
          const insertFineQuery = `
                      INSERT INTO fine (MemberID, BookID, Amount, PaymentStatus)
                      VALUES (?, ?, ?, FALSE)
                  `;
          const [result] = await db.query(insertFineQuery, [userId, transaction.BookID, transaction.fineAmount]);
          fines.push({
            fineId: result.insertId,
            bookTitle: transaction.bookTitle,
            fineAmount: transaction.fineAmount,
            paidStatus: false,
            dueDate: transaction.DueDate,
          });
        }
      }
    }
    res.status(200).json(fines);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const { userID } = req.params;
    const query = `SELECT * FROM notification WHERE MemberID = ?`;
    const [results] = await db.execute(query, [userID]);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { notificationID } = req.params;
    const query = `DELETE FROM notification WHERE ID = ?`;
    const [result] = await db.execute(query, [notificationID]);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFineStatus = async (req, res) => {
  try {
    const { fineId, paidStatus } = req.body;
    const query = 'UPDATE fine SET PaymentStatus = ? WHERE ID = ?';
    const [result] = await db.execute(query, [paidStatus, fineId]);
    res.status(200).json({ message: 'Fine Paid' });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}
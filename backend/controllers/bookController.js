const db = require('../db');

exports.getBooks = async (req, res) => {
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

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM books WHERE BookID = ?";
    const [result] = await db.execute(query, [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.insertBook = async (req, res) => {
  try {
    const { title, authorName, categoryName, year, language, totalCopies, image } = req.body;
    const authorQuery = "SELECT AuthorID FROM authors WHERE AuthorName = ?";
    const [authorResult] = await db.execute(authorQuery, [authorName]);
    const authorID = authorResult[0].AuthorID;

    const categoryQuery = "SELECT CategoryID FROM category WHERE CategoryName = ?";
    const [categoryResult] = await db.execute(categoryQuery, [categoryName]);
    const categoryID = categoryResult[0].CategoryID;

    const bookQuery = `
      INSERT INTO books (Title, AuthorID, CategoryID, PublishedYear, Language, TotalCopies, CopiesAvailable, Status, Image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Available', ?)
    `;
    const [result] = await db.execute(bookQuery, [title, authorID, categoryID, year, language, totalCopies, totalCopies, image]);

    res.status(201).json({ message: "Book added successfully", id: result.insertId });
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authorName, categoryName, year, language, totalCopies, image } = req.body;

    const authorQuery = "SELECT AuthorID FROM authors WHERE AuthorName = ?";
    const [authorResult] = await db.execute(authorQuery, [authorName]);
    const authorID = authorResult[0].AuthorID;

    const categoryQuery = "SELECT CategoryID FROM category WHERE CategoryName = ?";
    const [categoryResult] = await db.execute(categoryQuery, [categoryName]);
    const categoryID = categoryResult[0].CategoryID;

    const updateQuery = `
      UPDATE books 
      SET Title = ?, AuthorID = ?, CategoryID = ?, PublishedYear = ?, Language = ?, 
          TotalCopies = ?, CopiesAvailable = ?, Image = ? 
      WHERE BookID = ?
    `;
    const copiesAvailable = totalCopies;
    const [result] = await db.execute(updateQuery, [title, authorID, categoryID, year, language, totalCopies, copiesAvailable, image, id]);
    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json([]);
  }
};
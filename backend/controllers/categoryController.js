const db = require('../db');

exports.getCategories = async (req, res) => {
  try {
    const query = "SELECT * FROM category";
    const [results] = await db.execute(query);
    res.json(results);
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM category WHERE CategoryID = ?";
    const [result] = await db.execute(query, [id]);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json([]);
  }
};
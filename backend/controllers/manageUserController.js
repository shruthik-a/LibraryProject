const db = require('../db');

exports.getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM members";
    const [results] = await db.execute(query);
    res.json(results);
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM members WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM members WHERE ID = ?";
    const [result] = await db.execute(query, [id]);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.insertUser = async (req, res) => {
  try {
    const { name, email, password, mobile, plan } = req.body;
    const startDate = new Date().toISOString().slice(0, 10);
    let endDate;
    if (plan === '1') {
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 6);
      endDate = endDate.toISOString().slice(0, 10);
    } else if (plan === '2') {
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
      endDate = endDate.toISOString().slice(0, 10);
    }
    const query = "INSERT INTO members (Name, EmailID, PassWord, PhoneNumber, PlanID, StartDate, EndDate, WarningCount, ReinstatementCount,Status) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0,'Active')";
    const [result] = await db.execute(query, [name, email, password, mobile, plan, startDate, endDate]);
    res.status(201).json({ message: "User added successfully", id: result.insertId });
  } catch (err) {
    res.status(500).json([]);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, plan } = req.body;
    const query = "UPDATE members SET Name = ?, EmailID = ?, PhoneNumber = ?, PlanID = ?  WHERE id = ?";
    const [result] = await db.execute(query, [name, email, mobile, plan, id]);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json([]);
  }
};
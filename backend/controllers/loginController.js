const db = require('../db');

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM admin WHERE UserName = ? AND PassWord = ?';
  try {
    const [results] = await db.execute(query, [username, password]);
    if (results.length > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(200).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Database error' });
  }
};

exports.registerUser = async (req, res) => {
  const { currentDate, email, endDate, name, password, phoneNumber, plan } = req.body;
  const checkQuery = 'SELECT * FROM members WHERE EmailID = ?';
  const getPlanIDQuery = 'SELECT ID FROM plan WHERE PlanName = ?';
  const insertQuery = `
    INSERT INTO members 
    (Name, EmailID, PhoneNumber, PassWord, StartDate, EndDate, Status, PlanID,WarningCount,ReinstatementCount) 
    VALUES (?, ?, ?, ?, ?, ?, 'Active', ?,0,0)
  `;
  try {
    const [existingUser] = await db.execute(checkQuery, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const [planResult] = await db.execute(getPlanIDQuery, [plan]);
    if (planResult.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }
    const planID = planResult[0].ID;
    await db.execute(insertQuery, [name, email, phoneNumber, password, currentDate, endDate, planID]);
    return res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Database error' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM members WHERE EmailID = ? AND PassWord = ?';
  try {
    const [results] = await db.execute(query, [email, password]);
    if (results.length > 0) {
      return res.status(200).json({ success: true, user: results[0] });
    } else {
      return res.status(200).json({ success: false, message: 'User Not Found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Database error' });
  }
};

exports.checkUserExist = async (req, res) => {
  const { email } = req.query;
  const query = 'SELECT * FROM members WHERE EmailID = ?';
  try {
    const [results] = await db.execute(query, [email]);
    if (results.length > 0) {
      return res.status(200).json({ success: true, message: 'User exists', data: results });

    } else {
      return res.status(200).json({ success: false, message: 'User does not exist' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Database error' });
  }
};

exports.requestActivation = async (req, res) => {
  const { MemberID } = req.body;
  const today = new Date().toISOString().slice(0, 10);
  try {
    const checkQuery = 'SELECT * FROM ActivationRequest WHERE MemberID = ? AND RequestDate = ?';
    const [existingRequest] = await db.execute(checkQuery, [MemberID, today]);
    if (existingRequest.length > 0) {
      return res.status(400).json({
        success: false,
      });
    }
    const insertQuery = 'INSERT INTO ActivationRequest (MemberID, RequestDate) VALUES (?, ?)';
    const [result] = await db.execute(insertQuery, [MemberID, today]);
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

exports.newInstall = async (req, res) => {
  try {
    const { memberId, planId } = req.body;
    const query = `
      UPDATE members 
      SET 
        Status = "Active", 
        WarningCount = 0, 
        ReinstatementCount = 0 
      WHERE ID = ?
    `;
    await db.execute(query, [memberId]);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
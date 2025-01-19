const db = require('../db');

exports.getRequests = async (req, res) => {
  try {
    const query = `
        SELECT 
          a.ID as RequestID,
          a.MemberID, 
          a.RequestDate, 
          m.Name AS MemberName
        FROM activationRequest a
        JOIN members m ON a.MemberID = m.ID
        WHERE a.MemberID = m.ID
      `;
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.allowAccess = async (req, res) => {
  try {
    const { requestId, memberId } = req.body;
    const updateQuery = `
        UPDATE members 
        SET 
          WarningCount = 0, 
          ReinstatementCount = ReinstatementCount + 1, 
          Status = "Active"  
        WHERE ID = ?
      `;
    await db.execute(updateQuery, [memberId]);
    const removeRequestQuery = 'DELETE FROM activationrequest WHERE ID = ?';
    await db.execute(removeRequestQuery, [requestId]);
    res.status(200).json({ message: 'Access Allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
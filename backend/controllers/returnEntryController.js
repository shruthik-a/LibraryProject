const db = require('../db');

exports.getNotReturnedBooks = async (req, res) => {
    try {
        const query = "SELECT * FROM transaction WHERE ReturnedStatus = 'Not Return'";
        const [results] = await db.execute(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

exports.updateReturnStatus = async (req, res) => {
    try {
        const { transactionID, BookID } = req.body;
        const today = new Date().toISOString().slice(0, 10);
        const updateReturnQuery = `
            UPDATE transaction 
            SET ReturnedStatus = 'Returned', ReturnedDate = ? 
            WHERE ID = ?`;
        const [result] = await db.execute(updateReturnQuery, [today, transactionID]);
        const updateBookQuery = `
            UPDATE books
            SET CopiesAvailable = CopiesAvailable + 1
            WHERE BookID = ?`;
        const [bookResult] = await db.execute(updateBookQuery, [BookID]);
        res.status(200).json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

exports.updateDamageStatus = async (req, res) => {
    try {
        const { transactionID, bookID, MemberID } = req.body;
        const today = new Date().toISOString().slice(0, 10);
        const query = `SELECT DueDate, IsDamaged FROM transaction WHERE ID = ?`;
        const [result] = await db.execute(query, [transactionID]);
        let dueDate;
        if (typeof result[0].DueDate === 'string') {
            dueDate = result[0].DueDate.slice(0, 10);
        } else if (result[0].DueDate instanceof Date) {
            dueDate = result[0].DueDate.toISOString().slice(0, 10);
        }
        const isDamaged = result[0].IsDamaged;
        if (isDamaged !== 'Yes') {
            const updateDamageQuery = `
                UPDATE transaction 
                SET IsDamaged = 'Yes'
                WHERE ID = ?`;
            const [damageResult] = await db.execute(updateDamageQuery, [transactionID]);
            const warningQuery = 'UPDATE members SET WarningCount = WarningCount + 1 WHERE ID = ?';
            await db.execute(warningQuery, [MemberID]);
            const getWarningCountQuery = 'SELECT WarningCount FROM members WHERE WarningCount > 0';
            const [result] = await db.execute(getWarningCountQuery);
            const count = result[0].WarningCount;
            if (count > 0) {
                const updateStatusQuery = 'UPDATE members SET Status = "InActive" WHERE ID = ?';
                const [updateResult] = await db.execute(updateStatusQuery, [MemberID]);
            }
        }
        if (today > dueDate) {
            const updateDelayQuery = `
                UPDATE transaction
                SET IsDelayed = 'Yes'
                WHERE ID = ?`;
            const [delayResult] = await db.execute(updateDelayQuery, [transactionID]);
            const warningQuery = 'UPDATE members SET WarningCount = WarningCount + 1 WHERE ID = ?';
            await db.execute(warningQuery, [MemberID]);
            const getWarningCountQuery = 'SELECT WarningCount FROM members WHERE WarningCount > 0';
            const [result] = await db.execute(getWarningCountQuery);
            const count = result[0].WarningCount;
            if (count > 0) {
                const updateStatusQuery = 'UPDATE members SET Status = "InActive" WHERE ID = ?';
                const [updateResult] = await db.execute(updateStatusQuery, [MemberID]);
            }
        }
        res.status(200).json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};
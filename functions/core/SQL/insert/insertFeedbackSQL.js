
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertFeedbackSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.created);
    var created = new Date(value.created);
    var sql = "INSERT INTO Enquiries (id, user_ID, message, type, last_modified, created) VALUES (?,?,?,?,?,?)";
    var values = [snap.id, value.userId, value.message, "Feedback", lastModified, created];
    await sqlQuery(sql,values);
  }

  module.exports = {insertFeedbackSQL}
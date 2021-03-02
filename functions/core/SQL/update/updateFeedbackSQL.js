
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateFeedbackSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.message !== previousValue.message) {
      var sql = "UPDATE Enquiries SET message = ?, last_modified = ? WHERE message_ID = ?";
      var values = [newValue.message, lastModified, change.after.id];
      await sqlQuery(sql,values);
    }
  }

  module.exports = {updateFeedbackSQL}
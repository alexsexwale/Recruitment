
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateSupportSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.message !== previousValue.message) {
      var sql = "UPDATE Enquiries SET message = ?, last_modified = ? WHERE user_ID = ? AND message = ? AND type = ?";
      var values = [newValue.message, lastModified, newValue.userId, previousValue.message, "support"];
      await sqlQuery(sql,values);
    }
  }
  module.exports = {updateSupportSQL}
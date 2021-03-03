
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateSupportSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.message !== previousValue.message) {
      var sql = "UPDATE Enquiries SET message = ?, last_modified = ? WHERE id = ?";
      var values = [newValue.message, lastModified, change.after.id];
      await sqlQuery(sql,values);
    }
  }
  module.exports = {updateSupportSQL}
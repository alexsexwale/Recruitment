
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateApplicationSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.status !== previousValue.status) {
      var sql = "UPDATE Applications SET status = ?, last_modified = ? WHERE job_ID = ? AND student_ID = ?";
      var values = [newValue.status, lastModified, newValue.jobId, newValue.studentId];
      await sqlQuery(sql,values);
    }
    if (newValue.approved !== previousValue.approved) {
      sql = "UPDATE Applications SET approved = ?, last_modified = ? WHERE job_ID = ? AND student_ID = ?";
      values = [newValue.approved, lastModified, newValue.jobId, newValue.studentId];
      await sqlQuery(sql,values);
    }
  }

  module.exports = {updateApplicationSQL}
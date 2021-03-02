
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertApplicationSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);
    var sql = "INSERT INTO Applications (job_ID, student_ID, status, approved, last_modified, created) VALUES (?,?,?,?,?,?)";
    var values = [value.jobId, value.studentId, value.status, value.approved, lastModified,  created];
    await sqlQuery(sql,values);
  }

module.exports = {insertApplicationSQL}
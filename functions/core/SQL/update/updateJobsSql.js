
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateJobsSql(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var sql;
    var lastModified = new Date();
    if (newValue.name !== previousValue.name) {
      sql = "UPDATE Jobs SET name = ?, last_modified = ? WHERE job_ID = ?";
      var values = [newValue.name, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.verified !== previousValue.verified) {
      sql = "UPDATE Jobs SET verified = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.verified, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.jobType !== previousValue.jobType) {
      sql = "UPDATE Jobs SET job_type = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.jobType, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.education !== previousValue.education) {
      sql = "UPDATE Jobs SET education = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.education, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.experience !== previousValue.experience) {
      sql = "UPDATE Jobs SET experience = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.experience, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.startDate !== previousValue.startDate) {
      sql = "UPDATE Jobs SET start_date = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.startDate, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
  }

  module.exports = {updateJobsSql}
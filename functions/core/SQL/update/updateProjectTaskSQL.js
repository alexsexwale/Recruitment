
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateProjectTaskSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
    //Project_Tasks
    if (newValue.clientRatingComplete !== previousValue.clientRatingComplete) {
      var sql = "UPDATE Project_Tasks SET client_rating_complete = ?, last_modified = ? WHERE job_ID = ?";
      var values = [newValue.clientRatingComplete, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.duration !== previousValue.duration) {
      sql = "UPDATE Project_Tasks SET duration = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.duration, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.studentRatingComplete !== previousValue.studentRatingComplete) {
      sql = "UPDATE Project_Tasks SET student_rating_complete = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.studentRatingComplete, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    //Jobs
    if (newValue.description !== previousValue.description) {
      sql = "UPDATE Jobs SET job_description = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.description, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.location !== previousValue.location) {
      sql = "UPDATE Jobs SET location = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.location, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.status !== previousValue.status) {
      sql = "UPDATE Jobs SET job_status = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.status, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.satisfied !== previousValue.satisfied) {
      sql = "UPDATE Jobs SET satisfied = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.satisfied, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
  }

  module.exports = {updateProjectTaskSQL}
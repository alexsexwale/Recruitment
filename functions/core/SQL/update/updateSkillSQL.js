
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateSkillSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.category !== previousValue.category) {
      var sql = "UPDATE Jobs SET job_title = ?, last_modified = ? WHERE job_ID = ?";
      var values = [newValue.category, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.industry !== previousValue.industry) {
      sql = "UPDATE Jobs SET industry = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.industry, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
  }
  module.exports = {updateSkillSQL}

const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;
var sqlQueries;
var values;

async function updateSkillSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.category !== previousValue.category) {
      sqlQueries = "UPDATE Jobs SET job_title = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.category, lastModified, newValue.jobId];
      await sqlQuery(sqlQueries,values);
    }
    if (newValue.industry !== previousValue.industry) {
      sqlQueries = "UPDATE Jobs SET industry = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.industry, lastModified, newValue.jobId];
      await sqlQuery(sqlQueries,values);
    }
  }
  module.exports = {updateSkillSQL}

const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateRating(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.listening !== previousValue.listening) {
      var sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
      var values = [newValue.listening, lastModified, newValue.jobId, "listening"];
      await sqlQuery(sql,values);
    }

    if (newValue.communication !== previousValue.communication) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.communication, lastModified, newValue.jobId, "communication"];
        await sqlQuery(sql,values);
    }

    if (newValue.criticalThinking !== previousValue.criticalThinking) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.criticalThinking, lastModified, newValue.jobId, "critical thinking"];
        await sqlQuery(sql,values);
    }

    if (newValue.creative !== previousValue.creative) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.creative, lastModified, newValue.jobId, "creative"];
        await sqlQuery(sql,values);
    }

    if (newValue.initiative !== previousValue.initiative) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.initiative, lastModified, newValue.jobId, "initiative"];
        await sqlQuery(sql,values);
    }

    if (newValue.accountability !== previousValue.accountability) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.accountability, lastModified, newValue.jobId, "accountability"];
        await sqlQuery(sql,values);
    }
    
    if (newValue.planning !== previousValue.planning) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.planning, lastModified, newValue.jobId, "planning"];
        await sqlQuery(sql,values);
    }

    if (newValue.tracking !== previousValue.tracking) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.tracking, lastModified, newValue.jobId, "tracking"];
        await sqlQuery(sql,values);
    }
    
  }
  module.exports = {updateRating}
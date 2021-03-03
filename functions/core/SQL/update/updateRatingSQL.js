
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateStudentSoftSkillRatingSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.listening !== previousValue.listening) {
      var sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
      var values = [newValue.listening, lastModified, newValue.jobId, "Listening"];
      await sqlQuery(sql,values);
    }

    if (newValue.communication !== previousValue.communication) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.communication, lastModified, newValue.jobId, "Communication"];
        await sqlQuery(sql,values);
    }

    if (newValue.criticalThinking !== previousValue.criticalThinking) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.criticalThinking, lastModified, newValue.jobId, "Critical Thinking"];
        await sqlQuery(sql,values);
    }

    if (newValue.creative !== previousValue.creative) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.creative, lastModified, newValue.jobId, "Creative"];
        await sqlQuery(sql,values);
    }

    if (newValue.initiative !== previousValue.initiative) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.initiative, lastModified, newValue.jobId, "Initiative"];
        await sqlQuery(sql,values);
    }

    if (newValue.accountability !== previousValue.accountability) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.accountability, lastModified, newValue.jobId, "Accountability"];
        await sqlQuery(sql,values);
    }
    
    if (newValue.planning !== previousValue.planning) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.planning, lastModified, newValue.jobId, "Planning"];
        await sqlQuery(sql,values);
    }

    if (newValue.tracking !== previousValue.tracking) {
        sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.tracking, lastModified, newValue.jobId, "Tracking"];
        await sqlQuery(sql,values);
    }
    
  }

  async function updateStudentHardSkillRatingSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();

    if (newValue.hardSkill !== previousValue.hardSkill) {
        var sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        var values = [newValue.hardSkill, lastModified, newValue.jobId, "Hard Skill"];
        await sqlQuery(sql,values);
    }
    if (newValue.review !== previousValue.review) {
        sql = "UPDATE Ratings SET review = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.review, lastModified, newValue.jobId, "Hard Skill"];
        await sqlQuery(sql,values);
    }
  }

  async function updateClientRatingSQL(change) { 
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();

    if (newValue.rate !== previousValue.rate) {
        var sql = "UPDATE Ratings SET rate = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        var values = [newValue.rate, lastModified, newValue.jobId, "Client Rating"];
        await sqlQuery(sql,values);
    }
    if (newValue.review !== previousValue.review) {
        sql = "UPDATE Ratings SET review = ?, last_modified = ? WHERE job_ID = ? AND subcategory = ?";
        values = [newValue.review, lastModified, newValue.jobId, "Client Rating"];
        await sqlQuery(sql,values);
    }
  }
  module.exports = {updateStudentSoftSkillRatingSQL, updateStudentHardSkillRatingSQL, updateClientRatingSQL}
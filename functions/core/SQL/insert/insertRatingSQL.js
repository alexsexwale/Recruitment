
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertStudentSoftSkillRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    var values = [value.jobId, "communication", "listening", value.listening, "student", lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "communication", "communication", value.communication, "student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "problem solving", "critical thinking", value.criticalThinking, "student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "problem solving", "creative", value.creative, "student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "leadership", "initiative", value.initiative, "student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "leadership", "accountability", value.accountability, "student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "organisation", "planning", value.planning, "student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "organisation", "tracking", value.tracking, "student",  lastModified, created];
    await sqlQuery(sql,values);
  }

  async function insertStudentHardSkillRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.created);
    var created = new Date(value.created);

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, review, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var values = [value.jobId, "hard skill", "hard skill", value.hardSkill, value.review, "student",  lastModified, created];
    await sqlQuery(sql,values);
  }

  async function insertClientRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date();
    var created = new Date();

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, review, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var values = [value.jobId, "client rating", "client rating", value.rate, value.review, "client",  lastModified, created];
    await sqlQuery(sql,values);
  }
  module.exports = {insertStudentSoftSkillRatingSQL, insertStudentHardSkillRatingSQL, insertClientRatingSQL}

const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertStudentSoftSkillRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    var values = [value.jobId, "Communication", "Listening", value.listening, "Student", lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Communication", "Communication", value.communication, "Student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Problem Solving", "Critical Thinking", value.criticalThinking, "Student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Problem Solving", "Creative", value.creative, "Student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Leadership", "Initiative", value.initiative, "Student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Leadership", "Accountability", value.accountability, "Student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Organisation", "Planning", value.planning, "Student",  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?)";
    values = [value.jobId, "Organisation", "Tracking", value.tracking, "Student",  lastModified, created];
    await sqlQuery(sql,values);
  }

  async function insertStudentHardSkillRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.created);
    var created = new Date(value.created);

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, review, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var values = [value.jobId, "Hard Skill", "Hard Skill", value.hardSkill, value.review, "Student",  lastModified, created];
    await sqlQuery(sql,values);
  }

  async function insertClientRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date();
    var created = new Date();

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, review, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var values = [value.jobId, "Client Rating", "Client Rating", value.rate, value.review, "Client",  lastModified, created];
    await sqlQuery(sql,values);
  }
  module.exports = {insertStudentSoftSkillRatingSQL, insertStudentHardSkillRatingSQL, insertClientRatingSQL}
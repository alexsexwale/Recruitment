
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertRatingSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);

    var sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    var values = [value.jobId, "communication", "listening", value.listening,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "communication", "communication", value.communication,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "problem solving", "critical thinking", value.criticalThinking,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "problem solving", "creative", value.creative,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "leadership", "initiative", value.initiative,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "leadership", "accountability", value.accountability,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "organisation", "planning", value.planning,  lastModified, created];
    await sqlQuery(sql,values);

    sql = "INSERT INTO Ratings (job_ID, category, subcategory, rate, last_modified, created) VALUES (?,?,?,?,?,?)";
    values = [value.jobId, "organisation", "tracking", value.tracking,  lastModified, created];
    await sqlQuery(sql,values);
  }

  module.exports = {insertRatingSQL}
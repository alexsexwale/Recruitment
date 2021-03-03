
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;
const firebaseJS = require('../../../config/firebase.js');
const getDocument = firebaseJS.getDocument;

async function insertJobSQL(snap) {
    const value = snap.data();
    var startDate = new Date(value.startDate);
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);
  
    //get the job title ('category' in skills collection) and industry
    const skillsDoc =  await getDocument("skills", value.jobId);
    const skillsDocData = skillsDoc.data();
    const jobTitle = skillsDocData.category;
    const industry = skillsDocData.industry;

    var sql = "INSERT INTO Jobs (job_ID, client_ID, industry, name, verified, job_description, job_type, education, experience, job_title, start_date, location, payment, job_status, satisfied, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var values = [value.jobId, value.clientId, industry, value.name, value.verified, null, value.jobType, value.education, value.experience, jobTitle, startDate, null, null, null, null, lastModified, created];
    await sqlQuery(sql,values);
  
    //get the information from the 'micros' collection
    const microsDoc =  await getDocument("micros", value.jobId);
    const microsDocData = microsDoc.data();
    lastModified = new Date(microsDocData.lastModified);
    created = new Date(microsDocData.created);
  
    //if the job type is a project task, then the Project_Tasks table needs to get a new entry
    if (value.jobType === "Once-off Project/Task") {
      sql = "INSERT INTO Project_Tasks (job_ID, client_rating_complete, duration, student_rating_complete,last_modified, created) VALUES (?,?,?,?,?,?)";
      values = [microsDocData.jobId, microsDocData.clientRatingComplete, microsDocData.duration, microsDocData.studentRatingComplete, lastModified, created];
      await sqlQuery(sql,values);
    }
  
    //the information from micros currently pertains to any job, so this information must be added to the jobs table
    sql = "UPDATE Jobs SET job_description = ?, location = ?, job_status = ?, satisfied = ? WHERE job_ID = ?";
    values = [microsDocData.description, microsDocData.location, microsDocData.status, microsDocData.satisfied, microsDocData.jobId];
    await sqlQuery(sql,values);
  
  }

  module.exports = {insertJobSQL}

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

    var sql = "INSERT INTO Jobs (job_ID, client_ID, industry, name, verified, job_type, education, experience, job_title, start_date, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    var values = [value.jobId, value.clientId, industry, value.name, value.verified, value.jobType, value.education, value.experience, jobTitle, startDate, lastModified, created];
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

    //get the payments document and its data
    const paymentsDoc =  await getDocument("payments", value.jobId);
    const paymentsDocData = paymentsDoc.data();
    
    var jobId = paymentsDocData.jobId;
    var paymentDate = new Date(paymentsDocData.paymentDate);
    var amount = paymentsDocData.amount;
    var serviceFee = paymentsDocData.serviceFee;
    var facilitationCost = paymentsDocData.facilitationCost;
    var totalCostPaid = paymentsDocData.totalCostPaid;
    var inboundPayment = paymentsDocData.inboundPayment;
    var outboundPayment = paymentsDocData.outboundPayment;
    var paymentMethod = paymentsDocData.paymentMethod;
    var reference = paymentsDocData.reference;
    lastModified = new Date(paymentsDocData.lastModified);
    created = new Date(paymentsDocData.created);
    //insert into payments
    //replace is done because sometimes the payments record is created before the jobs record can finish
    sql = "REPLACE INTO Payments (job_ID, payment_date, budget, service_fee, admin_fee, total_cost_paid, inbound_payment, outbound_payment, payment_method, reference, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    values = [jobId, paymentDate, amount, serviceFee, facilitationCost, totalCostPaid, inboundPayment, outboundPayment, paymentMethod , reference, lastModified, created];
    await sqlQuery(sql,values);
  
  }

  module.exports = {insertJobSQL}
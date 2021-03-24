const sgMail = require("@sendgrid/mail");
const firebaseJS = require('../../config/firebase.js');
db = firebaseJS.db;
getDocument = firebaseJS.getDocument;

async function sendEmail(msg) {
    const doc = await getDocument("Settings", "Email");
    var settings = doc.data();
    sgMail.setApiKey(settings.apiKey);
    sgMail.send(msg);
}

// Send typed out emails
function standardEmail(receiver, sender, subject, message) {
    return {
        to: receiver,
        from: sender,
        subject: subject,
        text: message
    }
}

// Send alert for new job posts
function jobPost(receiver, sender, clientName, companyName, jobName, jobType, jobId, phone) {
    return {
      to: receiver,
      from: sender,
      subject: "New " + jobType + " job post",
      text: "Dear Jobox Team,\n\n" + clientName + " from " + companyName + " has posted a new " + jobType + " job on the platform, "
            + jobName + " (" + jobId + ").\n\nPlease verify the job post within 24 hours.\n\nYou can reach " + 
            clientName + " on their phone number, " + phone + ".\n\nKind regards,\nAlex Sexwale" 
    }
}

// Send alert to candidate selected
function applicantSelected(receiver, sender, jobName, jobType, jobId, applicantName) {
    return {
      to: receiver,
      from: sender,
      subject: "You have been selected for the job",
      text: "Hey " + applicantName + ",\n\nWould you look at that, you just got selected for the " + jobType + " job: " + jobName
           + " (" + jobId + ").\n\nTo accept/decline the job click here to login - https://app.jobox.co.za/login\n\n✌️\nJobox"
    }
  }
  function applicantDeclines(receiver, sender, jobName, jobType, jobId, applicantName, clientName) {
    return {
      to: receiver,
      from: sender,
      subject: "Applicant has declined the job",
      text: "hey " + clientName + ",\n\nUnfortunetly " + applicantName + " has declined the job offer for " + jobType + " job: " + jobName
            + " (" + jobId + ").\n\nPlease select another applicant for the job. Click here to login - https://app.jobox.co.za/login\n\n✌️\nJobox"
    }
  }

// Send alert to client
function clientEmail(messageType, receiver, sender, jobName, jobId, clientName, applicantName) {
    var subject = null;
    var message = null;
    if(messageType === "application") {
      subject = applicantName + " has applied for your job";
      message = "Hey " + clientName + ",\n\n Great news!"+ applicantName + " just applied for the job you posted:" 
    }
    if(messageType === "accept") {
      subject = "Student has accepted the job you have posted";
      message = "Hey " + clientName + ",\n\n" + applicantName + " has accepted the job: " + jobName + " (" + jobId +
                ").\n\nThis job is now active. You will receive a notification once the student has completed the job.\n\n✌️\nJobox";
    }
    if(messageType === "complete") {
      subject = applicantName + " has completed the job";
      message = "Hey " + clientName + ",\n\n" + applicantName + " has completed the job you posted: " + jobName + " (" + jobId +
                ").\n\nTo confirm completion click here to login - https://app.jobox.co.za/login \n\n✌️\nJobox";
    }
    if(messageType === "studentRatingClient") {
      subject = applicantName + " has rated the job you have posted";
      message = "Hey " + clientName + ",\n\n" + applicantName + " has given you a rating on the job you posted:" + jobName + " (" + jobId +
      ").\n\nTo view your rating, rate the student. Click here to login - https://app.jobox.co.za/login \n\n✌️\nJobox";
    }
    if(messageType === "summary") {
      subject = "";
      message = "";
    }
    return {
      to: receiver,
      from: sender,
      subject: subject,
      text: message
    }
  }
  
  // Send alert to student
  function studentEmail(messageType, receiver, sender, jobName, jobId, clientName, studentName) {
    var subject = null;
    var message = null;
    if(messageType === "accept") {
      subject = "You have accepted the job";
      message = "Hey " + studentName + ",\n\nYou have accepted the job: " + jobName + " (" + jobId +
      ").\n\nTo view the details of this job, remember to login and head over to the active jobs tab.\n\nOnce you have completed the job, remember to indicate completion on the job page in order to get paid.\n\n✌️\nJobox";
    }
    if(messageType === "rate") {
      subject = "Looks like the client has confirmed completion of the job!";
      message = "Hey " + studentName + ",\n\n" + clientName + " has confirmed completion of " + jobName + " (" + jobId +
      ").\n\nTo rate and review the order click here to login - https://app.jobox.co.za/login \n\nYour review will only become available once you have reviewed the client.\n\n✌️\nJobox";
    }
    if(messageType === "clientRatingStudent") {
      subject = "The client has rated you!";
      message = "Hey " + studentName + ",\n\n" + clientName + " has given you a rating on the job you completed:" + jobName + " (" + jobId +
      ").\n\nTo view your rating, rate the client. Click here to login - https://app.jobox.co.za/login \n\n✌️\nJobox";
    }
    if(messageType === "summary") {
      subject = "";
      message = "";
    }
    return {
      to: receiver,
      from: sender,
      subject: subject,
      text: message
    }
  }
module.exports = {sendEmail, standardEmail, jobPost, applicantSelected, applicantDeclines, clientEmail,studentEmail}
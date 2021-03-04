
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;
const createMySQLconnection = sql.createMySQLconnection;

async function studentSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var disability;
    var vehicle;
    var license;
    var studying;
    if (newValue.disability === "Yes") {
      disability = true;
    }
    else {
      disability = false;
    }
    if (newValue.vehicle === "Yes") {
      vehicle = true;
    }
    else {
      vehicle = false;
    }
    if (newValue.license === "Yes") {
      license = true;
    }
    else {
      license = false;
    }
    if (newValue.studying === "Yes") {
      studying = true;
    }
    else {
      studying = false;
    }
    // New students document created
    //makes onUpdate behave like an onCreate (only after account is done being created will this code run)
    if (newValue.accountCreated === true && previousValue.accountCreated === false) {
      var lastModified = new Date(newValue.lastModified);
      var created = new Date(newValue.created);
      var dateOfBirth = new Date(newValue.dateOfBirth);
      
      var sql = "INSERT INTO Students (student_ID, user_ID, race, gender, date_of_birth, bio, citizenship, identification_number, disability, vehicle, drivers_license, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
      var values = [newValue.userId, newValue.userId, newValue.race, newValue.gender, dateOfBirth, newValue.bio, newValue.citizenship, newValue.identification, disability, vehicle, license, lastModified, created];
      await sqlQuery(sql,values);
      //Student_Bank_Details
      sql = "INSERT INTO Student_Bank_Details (student_ID, account_name, account_number, account_type, bank_name, branch_code, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
      values = [newValue.userId, newValue.accountName, newValue.accountNumber, newValue.accountType, newValue.bankName, newValue.branchCode, lastModified, created];
      await sqlQuery(sql,values);
      //Disabled_Students
      if (newValue.disability === "Yes") {
        sql = "INSERT INTO Disabled_Students (student_ID, disability_description, last_modified, created) VALUES (?,?,?,?)";
        values = [newValue.userId, newValue.disabilityDescription, lastModified, created];
        await sqlQuery(sql,values);
      }
      //Industry_Alerts
      var mysqlConnection = await createMySQLconnection();
      for (const key in newValue.interestedIndustries) {
        const data = newValue.interestedIndustries[key];
        // now key and data are the property name and data
        sql = "INSERT INTO Industry_Alerts (student_ID, industry, last_modified, created) VALUES (?,?,?,?)";
        values = [newValue.userId, data, lastModified, created];
        var query = mysqlConnection.query(sql, values, (error) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(query.sql);
          }
        });
      }
      mysqlConnection.end((error) => {
        if (error) {
          console.log(error);
        }
        else {
          console.log('The connection is terminated now');
        }
      });
      //Work_Experiences
      sql = "INSERT INTO Work_Experiences (student_ID, description, job_title, start_date, end_date, employer, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
      var startDate1 = new Date(newValue.startDate1);
      var endDate1 = new Date(newValue.endDate1);
      values = [newValue.userId, newValue.description1, newValue.jobTitle1, startDate1, endDate1, newValue.employer1, lastModified, created];
      await sqlQuery(sql,values);
      //social medias
      if (newValue.facebook !== null) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Facebook", newValue.facebook, lastModified, created];
        await sqlQuery(sql,values);
      }
      if (newValue.github !== null) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Github", newValue.github, lastModified, created];
        await sqlQuery(sql,values);
      }
      if (newValue.instagram !== null) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Instagram", newValue.instagram, lastModified, created];
        await sqlQuery(sql,values);
      }
      if (newValue.linkedIn !== null) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "LinkedIn", newValue.linkedIn, lastModified, created];
        await sqlQuery(sql,values);
      }
      if (newValue.twitter !== null) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Twitter", newValue.twitter, lastModified, created];
        await sqlQuery(sql,values);
      }
      if (newValue.personalWebsite !== null) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Personal Website", newValue.personalWebsite, lastModified, created];
        await sqlQuery(sql,values);
      }
      //qualifications
      sql = "INSERT INTO Qualifications (student_ID, qualification_type, graduate_status, currently_studying , year, qualification_title, faculty, institution, institution_type, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
      values = [newValue.userId, "Degree", newValue.graduateStatus, studying, newValue.year, newValue.degree, newValue.faculty, newValue.institution, newValue.institutionType, lastModified, created];
      await sqlQuery(sql,values);
    }
    //students document updated
    if (newValue.accountCreated === true && previousValue.accountCreated === true) {
      lastModified = new Date();
      //Students
      if (newValue.race !== previousValue.race) {
        sql = "UPDATE Students SET race = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.race, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.gender !== previousValue.gender) {
        sql = "UPDATE Students SET gender = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.gender, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.dateOfBirth !== previousValue.dateOfBirth) {
        sql = "UPDATE Students SET date_of_birth = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.dateOfBirth, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.bio !== previousValue.bio) {
        sql = "UPDATE Students SET bio = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.bio, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.citizenship !== previousValue.citizenship) {
        sql = "UPDATE Students SET citizenship = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.citizenship, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.identification !== previousValue.identification) {
        sql = "UPDATE Students SET identification_number = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.identification, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.disability !== previousValue.disability) {
        sql = "UPDATE Students SET disability = ?, last_modified = ? WHERE student_ID = ?";
        values = [disability, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.vehicle !== previousValue.vehicle) {
        sql = "UPDATE Students SET vehicle = ?, last_modified = ? WHERE student_ID = ?";
        values = [vehicle, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.license !== previousValue.license) {
        sql = "UPDATE Students SET drivers_license = ?, last_modified = ? WHERE student_ID = ?";
        values = [license, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      //Student_Bank_Details
      if (newValue.accountName !== previousValue.accountName) {
        sql = "UPDATE Student_Bank_Details SET account_name = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.accountName, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.accountNumber !== previousValue.accountNumber) {
        sql = "UPDATE Student_Bank_Details SET account_number = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.accountNumber, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.accountType !== previousValue.accountType) {
        sql = "UPDATE Student_Bank_Details SET account_type = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.accountType, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.bankName !== previousValue.bankName) {
        sql = "UPDATE Student_Bank_Details SET bank_name = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.bankName, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.branchCode !== previousValue.branchCode) {
        sql = "UPDATE Student_Bank_Details SET branch_code = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.branchCode, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      //Disabled_Students
      if (newValue.disabilityDescription !== previousValue.disabilityDescription) {
        sql = "UPDATE Disabled_Students SET disability_description = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.disabilityDescription, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      //Industry_Alerts
      if (newValue.interestedIndustries.toString() !== previousValue.interestedIndustries.toString()) {
        mysqlConnection = await createMySQLconnection();
        //delete all the old values from the database
        for (const oldKey in previousValue.interestedIndustries) {
          const oldData = previousValue.interestedIndustries[oldKey];
          // now key and data are the property name and data
            sql = "DELETE FROM Industry_Alerts WHERE student_ID = ? AND industry = ?";
            values = [previousValue.userId, oldData];
            query = mysqlConnection.query(sql, values, (error) => {
              if (error) {
                console.log(error);
              }
              else {
                console.log(query.sql);
              }
            });
   
        }
        //insert all the new values into the database
        created = new Date(previousValue.created);
        for (const newKey in newValue.interestedIndustries) {
          const newData = newValue.interestedIndustries[newKey];
          // now key and data are the property name and data
          sql = "INSERT INTO Industry_Alerts (student_ID, industry, last_modified, created) VALUES (?,?,?,?)";
          values = [newValue.userId, newData, lastModified, created];
          query = mysqlConnection.query(sql, values, (error) => {
            if (error) {
              console.log(error);
            }
            else {
              console.log(query.sql);
            }
          });
        }
        mysqlConnection.end((error) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log('The connection is terminated now');
          }
        });
      }
      //Work_Experiences
      if (newValue.description1 !== previousValue.description1) {
        sql = "UPDATE Work_Experiences SET description = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.description1, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.jobTitle1 !== previousValue.jobTitle1) {
        sql = "UPDATE Work_Experiences SET job_title = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.jobTitle1, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.startDate1 !== previousValue.startDate1) {
        startDate1 = new Date(newValue.startDate1);
        sql = "UPDATE Work_Experiences SET start_date = ?, last_modified = ? WHERE student_ID = ?";
        values = [startDate1, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.endDate1 !== previousValue.endDate1) {
        endDate1 = new Date(newValue.endDate1);
        sql = "UPDATE Work_Experiences SET end_date = ?, last_modified = ? WHERE student_ID = ?";
        values = [endDate1, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.employer1 !== previousValue.employer1) {
        sql = "UPDATE Work_Experiences SET employer = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.employer1, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      //social medias
      if (newValue.facebook !== previousValue.facebook) {
        sql = "UPDATE Social_Media_Handles SET url = ?, last_modified = ? WHERE student_ID = ? AND type = ?";
        values = [newValue.facebook, lastModified, newValue.userId, "Facebook"];
        await sqlQuery(sql,values);
      }
      if (newValue.github !== previousValue.github) {
        sql = "UPDATE Social_Media_Handles SET url = ?, last_modified = ? WHERE student_ID = ? AND type = ?";
        values = [newValue.github, lastModified, newValue.userId, "Github"];
        await sqlQuery(sql,values);
      }
      if (newValue.instagram !== previousValue.instagram) {
        sql = "UPDATE Social_Media_Handles SET url = ?, last_modified = ? WHERE student_ID = ? AND type = ?";
        values = [newValue.instagram, lastModified, newValue.userId, "Instagram"];
        await sqlQuery(sql,values);
      }
      if (newValue.linkedIn !== previousValue.linkedIn) {
        sql = "UPDATE Social_Media_Handles SET url = ?, last_modified = ? WHERE student_ID = ? AND type = ?";
        values = [newValue.linkedIn, lastModified, newValue.userId, "LinkedIn"];
        await sqlQuery(sql,values);
      }
      if (newValue.twitter !== previousValue.twitter) {
        sql = "UPDATE Social_Media_Handles SET url = ?, last_modified = ? WHERE student_ID = ? AND type = ?";
        values = [newValue.twitter, lastModified, newValue.userId, "Twitter"];
        await sqlQuery(sql,values);
      }
      if (newValue.personalWebsite !== previousValue.personalWebsite) {
        sql = "UPDATE Social_Media_Handles SET url = ?, last_modified = ? WHERE student_ID = ? AND type = ?";
        values = [newValue.personalWebsite, lastModified, newValue.userId, "Personal Website"];
        await sqlQuery(sql,values);
      }
      //if new social medias were added:
      if ((newValue.facebook !== null) && (previousValue.facebook === null)) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Facebook", newValue.facebook, lastModified, created];
        await sqlQuery(sql,values);
      }
      if ((newValue.github !== null) && (previousValue.github === null)) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Github", newValue.github, lastModified, created];
        await sqlQuery(sql,values);
      }
      if ((newValue.instagram !== null) && (previousValue.instagram === null)) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Instagram", newValue.instagram, lastModified, created];
        await sqlQuery(sql,values);
      }
      if ((newValue.linkedIn !== null) && (previousValue.linkedIn === null)) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "LinkedIn", newValue.linkedIn, lastModified, created];
        await sqlQuery(sql,values);
      }
      if ((newValue.twitter !== null) && (previousValue.twitter === null)) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Twitter", newValue.twitter, lastModified, created];
        await sqlQuery(sql,values);
      }
      if ((newValue.personalWebsite !== null) && (previousValue.personalWebsite === null)) {
        sql = "INSERT INTO Social_Media_Handles (student_ID, type, url, last_modified, created) VALUES (?,?,?,?,?)";
        values = [newValue.userId, "Personal Website", newValue.personalWebsite, lastModified, created];
        await sqlQuery(sql,values);
      }
      //qualifications
      if (newValue.graduateStatus !== previousValue.graduateStatus) {
        sql = "UPDATE Qualifications SET graduate_status = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.graduateStatus, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.studying !== previousValue.studying) {
        sql = "UPDATE Qualifications SET currently_studying  = ?, last_modified = ? WHERE student_ID = ?";
        values = [studying, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.year !== previousValue.year) {
        sql = "UPDATE Qualifications SET year = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.year, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.degree !== previousValue.degree) {
        sql = "UPDATE Qualifications SET qualification_title = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.degree, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.faculty !== previousValue.faculty) {
        sql = "UPDATE Qualifications SET faculty = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.faculty, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.institution !== previousValue.institution) {
        sql = "UPDATE Qualifications SET institution = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.institution, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.institutionType !== previousValue.institutionType) {
        sql = "UPDATE Qualifications SET institution_type = ?, last_modified = ? WHERE student_ID = ?";
        values = [newValue.institutionType, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
    }
  }
  module.exports = {studentSQL}
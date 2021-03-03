
const sql = require('../sqlQuery.js');
const createMySQLconnection = sql.createMySQLconnection;
const firebaseJS = require('../../../config/firebase.js');
const getDocument = firebaseJS.getDocument;

async function insertVettingSQL(snap) {
    const value = snap.data();
    var mysqlConnection = await createMySQLconnection();
    var lastModified = new Date(value.created);
    var created = new Date(value.lastModified);
    //get the student ID from students 
    const studentsDoc =  await getDocument("students", snap.id);
    const studentsDocData = studentsDoc.data();
    const studentId = studentsDocData.userId;
    //iterate over the different skills in the vetting document
    for (const skill in value) {
      const isVetted = value[skill];
      // now skill and isVetted are the property name and value that can be inserted to MySQL
  
      //if a field is not a skill, skip to the next iteration
      if (isVetted !== true) {
        continue;
      }
      var sql = "INSERT INTO Vettings (student_ID, expertise, last_modified, created) VALUES (?,?,?,?)";
      var values = [studentId, skill, lastModified, created];
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
  }

  module.exports = {insertVettingSQL}
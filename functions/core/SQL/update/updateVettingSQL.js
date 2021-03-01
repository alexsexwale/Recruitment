const sql = require('../sqlQuery.js');
const createMySQLconnection = sql.createMySQLconnection;
const firebaseJS = require('../../../config/firebase.js');
const getDocument = firebaseJS.getDocument;

async function updateVettingSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var mysqlConnection = await createMySQLconnection();
     //get the student ID from students 
     const studentsDoc =  await getDocument("students", change.after.id);
     const studentsDocData = studentsDoc.data();
     const studentId = studentsDocData.userId;
     var lastModified = new Date();
     
    //iterate over the different skills in the vetting document
    for (const skill in newValue) {
      const isVetted = newValue[skill];
      // now skill and isVetted are the property name and value 
  
      //only update if there was a change
      if (newValue[skill] !== previousValue[skill])
      {
        var sql = "UPDATE Vettings SET is_vetted = ?, last_modified = ? WHERE student_ID = ? AND expertise = ?";
        var values = [isVetted, lastModified, studentId, skill];
        var query = mysqlConnection.query(sql, values, (error) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(query.sql);
          }
        });
      }
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

  module.exports = {updateVettingSQL}
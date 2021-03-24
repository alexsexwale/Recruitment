var mysql = require('mysql');
const firebaseJS = require('../../config/firebase.js');
const getDocument = firebaseJS.getDocument;


//establish MySQL connection
async function createMySQLconnection() {
    //MySQL details 
    const settingsCollection = await getDocument("Settings", "MySQL");
    var MySQLsettings = settingsCollection.data();
    var mysqlConnection = mysql.createConnection({
      // Used when we deploy
      socketPath: MySQLsettings.socketPath,
      // Used when we are testing locally
      //host: '35.239.215.232',
      user: MySQLsettings.user,
      password: MySQLsettings.password,
      database: MySQLsettings.database,
      multipleStatements: MySQLsettings.multipleStatements
      
    });
    //init connection
    mysqlConnection.connect((err) => {
      if (!err)
        console.log('SQL Connection Established Successfully');
      else {
        console.log('SQL Connection Failed!' + JSON.stringify(err, undefined, 2));
        console.log(err);
      }
    });
    return mysqlConnection
  }

//perform a query. Can't be used in loops due to await.
async function sqlQuery(sql, values) {
    
    var mysqlConnection = await createMySQLconnection();
    var query = mysqlConnection.query(sql, values, (error) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(query.sql);
      }
    });
    mysqlConnection.end((error) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log('The connection is terminated now');
      }
    });
    return null;
  }
  
module.exports = {createMySQLconnection, sqlQuery}
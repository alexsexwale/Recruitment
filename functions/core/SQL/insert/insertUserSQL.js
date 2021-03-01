
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertUserSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);
    var sql = "INSERT INTO Users (user_ID, email, name, surname, phone, user_role, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
    var values = [value.userId, value.email, value.name, value.surname, value.phone, value.user, lastModified, created];
    await sqlQuery(sql,values);
  }

  
  module.exports = {insertUserSQL}
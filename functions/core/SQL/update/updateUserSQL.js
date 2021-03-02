
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updateUserSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
  
    if (newValue.email !== previousValue.email) {
      var sql = "UPDATE Users SET email = ?, last_modified = ? WHERE user_ID = ?";
      var values = [newValue.email, lastModified, newValue.userId];
      await sqlQuery(sql,values);
    }
    if (newValue.name !== previousValue.name) {
      sql = "UPDATE Users SET name = ?, last_modified = ? WHERE user_ID = ?";
      values = [newValue.name, lastModified, newValue.userId];
      await sqlQuery(sql,values);
    }
    if (newValue.surname !== previousValue.surname) {
      sql = "UPDATE Users SET surname = ?, last_modified = ? WHERE user_ID = ?";
      values = [newValue.surname, lastModified, newValue.userId];
      await sqlQuery(sql,values);
    }
    if (newValue.phone !== previousValue.phone) {
      sql = "UPDATE Users SET phone = ?, last_modified = ? WHERE user_ID = ?";
      values = [newValue.phone, lastModified, newValue.userId];
      await sqlQuery(sql,values);
    }
    if (newValue.user !== previousValue.user) {
      sql = "UPDATE Users SET user_role = ?, last_modified = ? WHERE user_ID = ?";
      values = [newValue.user, lastModified, newValue.userId];
      await sqlQuery(sql,values);
    }
  }

  module.exports = {updateUserSQL}
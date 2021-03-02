
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function clientSQL(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    //makes onUpdate behave like an onCreate (only after account is done being created will this code run)
    if (newValue.accountCreated === true && previousValue.accountCreated === false) {
      var lastModified = new Date(newValue.lastModified);
      var created = new Date(newValue.created);
      //client table
      var sql = "INSERT INTO Clients (client_ID, user_ID, industry, bio, vat, website, company_category, company_size, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?)";
      var values = [newValue.userId, newValue.userId, newValue.industry, newValue.bio, newValue.vat, newValue.website, newValue.companyCategory, newValue.companySize, lastModified, created];
      await sqlQuery(sql,values);
      //client_addresses table
      sql = "INSERT INTO Client_Addresses (client_ID, address_line_1, city, country, postal_code_zip_code, province_state, last_modified, created) VALUES (?,?,?,?,?,?,?,?)";
      values = [newValue.userId, newValue.addressLine1, newValue.city, newValue.country, newValue.postalCode_zipCode, newValue.province_state, lastModified, created];
      query = await sqlQuery(sql,values);
    }
    else { //client document updated
      lastModified = new Date();
      if (newValue.industry !== previousValue.industry) {
        sql = "UPDATE Clients SET industry = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.industry, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.bio !== previousValue.bio) {
        sql = "UPDATE Clients SET bio = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.bio, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.vat !== previousValue.vat) {
        sql = "UPDATE Clients SET vat = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.vat, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.website !== previousValue.website) {
        sql = "UPDATE Clients SET website = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.website, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.companyCategory !== previousValue.companyCategory) {
        sql = "UPDATE Clients SET company_category = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.companyCategory, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.companySize !== previousValue.companySize) {
        sql = "UPDATE Clients SET company_size = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.companySize, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.addressLine1 !== previousValue.addressLine1) {
        sql = "UPDATE Client_Addresses SET address_line_1 = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.addressLine1, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.city !== previousValue.city) {
        sql = "UPDATE Client_Addresses SET city = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.city, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.country !== previousValue.country) {
        sql = "UPDATE Client_Addresses SET country = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.country, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.postalCode_zipCode !== previousValue.postalCode_zipCode) {
        sql = "UPDATE Client_Addresses SET postal_code_zip_code = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.postalCode_zipCode, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
      if (newValue.province_state !== previousValue.province_state) {
        sql = "UPDATE Client_Addresses SET province_state = ?, last_modified = ? WHERE client_ID = ?";
        values = [newValue.province_state, lastModified, newValue.userId];
        await sqlQuery(sql,values);
      }
    }
  }

module.exports = {clientSQL}
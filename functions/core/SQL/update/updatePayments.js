
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function updatePayments(change) {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    var lastModified = new Date();
    if (newValue.paymentDate !== previousValue.paymentDate) {
      var sql = "UPDATE Payments SET payment_date = ?, last_modified = ? WHERE job_ID = ?";
      var paymentDate =  new Date(newValue.paymentDate);
      var values = [paymentDate, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.amount !== previousValue.amount) {
      sql = "UPDATE Payments SET budget = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.amount, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.serviceFee !== previousValue.serviceFee) {
      sql = "UPDATE Payments SET service_fee = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.serviceFee, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.facilitationCost !== previousValue.facilitationCost) {
      sql = "UPDATE Payments SET admin_fee = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.facilitationCost, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.totalCostPaid !== previousValue.totalCostPaid) {
      sql = "UPDATE Payments SET total_cost_paid = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.totalCostPaid, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.inboundPayment !== previousValue.inboundPayment) {
      sql = "UPDATE Payments SET inbound_payment = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.inboundPayment, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.outboundPayment !== previousValue.outboundPayment) {
      sql = "UPDATE Payments SET outbound_payment = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.outboundPayment, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.paymentMethod !== previousValue.paymentMethod) {
      sql = "UPDATE Payments SET payment_method = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.paymentMethod, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }
    if (newValue.reference !== previousValue.reference) {
      sql = "UPDATE Payments SET reference = ?, last_modified = ? WHERE job_ID = ?";
      values = [newValue.reference, lastModified, newValue.jobId];
      await sqlQuery(sql,values);
    }

  }

  module.exports = {updatePayments}
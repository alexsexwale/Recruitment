
const sql = require('../sqlQuery.js');
const sqlQuery = sql.sqlQuery;

async function insertPaymentSQL(snap) {
    const value = snap.data();
    var lastModified = new Date(value.lastModified);
    var created = new Date(value.created);
    var paymentDate = new Date(value.paymentDate);
    var sql = "INSERT INTO Payments (job_ID, payment_date, budget, service_fee, admin_fee, total_cost_paid, inbound_payment, outbound_payment, payment_method, reference, last_modified, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    var values = [value.jobId, paymentDate, value.amount, value.serviceFee, value.facilitationCost, value.totalCostPaid, value.inboundPayment, value.outboundPayment, value.paymentMethod ,value.reference, lastModified, created];
    await sqlQuery(sql,values);
  }

  module.exports = {insertPaymentSQL}
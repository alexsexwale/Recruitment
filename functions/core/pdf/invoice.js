/* This code should be a module used in multiple instances */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(cors({ origin: true }));
router.use(urlencodedParser);
router.use(bodyParser.json());
/* ------------------------------------------------------ */
const ejs = require("ejs");
const pdf = require("html-pdf"); // https://www.npmjs.com/package/html-pdf
const path = require("path");
const firebase = require("../../config/firebase");

const moment = require("moment");

const getDocument = firebase.getDocument;
const storage = firebase.storage;

async function generateInvoice(snap) {
  let doc = null;
  const value = snap.data();

  doc = await getDocument("Settings", "Storage");
  const storageBucket = doc.data().storageBucket;
  const bucket = storage.bucket(storageBucket);

  // retrieve data about Jobox
  doc = await getDocument("Settings", "Jobox");
  const jobox = doc.data();

  const joboxAddressLine1 = jobox.addressLine1;
  const joboxAddressLine2 = jobox.addressLine2;
  const joboxCity = jobox.city;
  const joboxContactNumber = jobox.contactNumber;
  const joboxPostalCode = jobox.postalCode;
  const joboxCountry = jobox.country;
  const joboxProvince = jobox.province;

  // retrieve data from the micros
  doc = await getDocument("micros", value.jobId);
  const micros = doc.data();

  const description = micros.description;
  const adminCost = Number(micros.facilitation).toFixed(2);
  const budget = Number(micros.budget).toFixed(2);
  const serviceFee = Number(micros.commission).toFixed(2);
  const total = Number(micros.total).toFixed(2);
  let created = micros.created;

  // retrieve client details using clientId
  doc = await getDocument("clients", value.clientAlias);
  const clients = doc.data();

  const addressLine1 = clients.addressLine1;
  const addressLine2 = clients.addressLine2;
  const city = clients.city;
  const companyName = clients.companyName;
  const country = clients.country;
  const postalCode_zipCode = clients.postalCode_zipCode;
  const province_state = clients.province_state;

  // resolve invoice number
  const today = new Date();
  const year = today.getFullYear();

  let invoices = "";
  let filePath = `Invoices/#J${year}`;

  invoices = await bucket
    .getFiles({ prefix: filePath })
    .then(files => (files[0].length + 1).toString().padStart(3, "0"))
    .catch(err => {
      return res.status(500).send(err);
    });

  const invoiceNo = `J${year}${invoices}`;

  created = moment(created, "DD/MM/yyyy").format("DD MMM yyyy");

  // set up the data that needs to be in the Pdf
  const invoice = {
    invoiceNo,
    adminCost,
    budget,
    created,
    total,
    description,
    serviceFee,
    addressLine1,
    addressLine2,
    city,
    companyName,
    country,
    postalCode_zipCode,
    province_state,
    joboxAddressLine1,
    joboxAddressLine2,
    joboxCity,
    joboxProvince,
    joboxCountry,
    joboxContactNumber,
    joboxPostalCode
  };

  filePath = `Invoices/#${invoiceNo}.pdf`;

  // using ejs as a template render the pdf
  return ejs.renderFile(
    path.join(__dirname, "./templates/", "invoice.ejs"),
    {
      invoice
    },
    async (err, data) => {
      if (err) {
        return {
          status: err.message,
          msg: err.message };
      } else {

        doc = await getDocument("Settings", "Backend");
        const baseURL = doc.data().api;

        const options = {
          format: "A4",
          orientation: "portrait",
          type: "pdf",
          timeout: "100000",
          phantomArgs: ["--web-security=no", "--local-url-access=false"],
          base: baseURL
        };

        return pdf.create(data, options).toStream(async (err, stream) => {
          if (err) {
            return {
              status: err.status, 
              msg: err.responseText };
          } else {
            const file = bucket.file(filePath);
            stream
              .pipe(
                file.createWriteStream({
                  metadata: {
                    contentType: "application/pdf"
                  }
                })
              )
              .on("error", err => {
                return {
                  status: 500, 
                  msg: `Error encountered: ${err.message}` };
              })
              .on("finish", () => {
                console.log("Upload successful");

                let invoicesRef = db.collection("invoices");
                invoicesRef.doc(value.jobId).set({
                  "invoiceNo": invoiceNo,
                  "jobId": value.jobId,
                  "bucket": storageBucket,
                  "filePath": filePath,
                  "created": created
                });

                return {
                  status: 200,
                  msg: `Successfully created: ${file.name}` };
              });
          }
        });
      }
    }
  );
}

module.exports = { generateInvoice };

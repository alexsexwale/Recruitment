/* This code should be a module used in multiple instances */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(cors({ origin: true }));
router.options("*", cors());
router.use(urlencodedParser);
router.use(bodyParser.json());
/* ------------------------------------------------------ */

const firebase = require("../../config/firebase");
const storage = firebase.storage;
const getDocument = firebase.getDocument;
const sgMail = require("@sendgrid/mail");

router.post("/sendPdf", async (req, res) => {
  // download pdf from firestore
  let attachment = null;
  let doc = null;
  const bucket = storage.bucket(req.body.bucket);
  const remoteFile = bucket.file(req.body.filePath);

  doc = await getDocument("Settings", "Email");
  const email = doc.data();

  // download the file into memory
  remoteFile
    .download()
    .then(contents => {
      // email the attachment
      attachment = contents[0].toString("base64");
      const fileName = `Jobox_${remoteFile.name}`;

      sgMail.setApiKey(email.apiKey);

      const msg = {
        to: req.body.email,
        from: email.active,
        subject: req.body.subject,
        text: req.body.message,
        attachments: [
          {
            content: attachment,
            filename: fileName,
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
      };

      sgMail.send(msg);

      return res.status(200).send("Sent");
    })
    .catch(err => {
      return res.status(500).send(err.message);
    });
});

router.get("/downloadPdf", async (req, res) => {
  // download pdf from firestore

  const bucket = storage.bucket(req.query.bucket);
  const remoteFile = bucket.file(req.query.filePath);

  await remoteFile
    .download()
    .then(contents => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${remoteFile.name}`
      });

      return res.status(200).send(contents[0]);
    })
    .catch(err => {
      return res.status(500).send(err.message);
    });
});

module.exports = router;

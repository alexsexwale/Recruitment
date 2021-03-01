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

var jwt = require("jsonwebtoken");
const firebase = require("../config/firebase");

const getDocument = firebase.getDocument;

router.post("/generateToken", async (res, req) => {
  let userId = req.body.userId;
  let doc = await getDocument("Settings", "Backend");
  let secret = doc.data().jwtSecret;

  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: 86400
  });

  return {
    status: 200,
    token: token
  };
});

module.exports = router;

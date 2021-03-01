var jwt = require("jsonwebtoken");
const firebase = require("../config/firebase");

const getDocument = firebase.getDocument;

async function verifyToken(req, res, next) {
  let doc = await getDocument("Settings", "Backend");
  let secret = doc.data().jwtSecret;
  let token = req.headers["x-access-token"];

  if (!token)
    return {
      status: 403,
      error: "No token provided."
    };

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return {
        status: 500,
        error: "Failed to authenticate token."
      };

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;

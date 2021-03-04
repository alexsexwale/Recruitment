/* eslint-disable */
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

const firebase = require("../config/firebase");
const axios = require("axios");
const adal = require("adal-node"); // Use ADAL.js for authentication

const getDocument = firebase.getDocument;

//Microsoft - access token
async function getAuthToken() {
  let doc = await getDocument("Settings", "PowerBI");
  let powerbi = doc.data();

  let AuthenticationContext = adal.AuthenticationContext;
  let authorityUri = powerbi.authorityUri.replace("common", powerbi.tenantId);
  let context = new AuthenticationContext(authorityUri);

  return new Promise(
    (resolve, reject) => {
      context.acquireTokenWithUsernamePassword(
        powerbi.scope,
        powerbi.pbiUsername,
        powerbi.pbiPassword,
        powerbi.clientId,
        (err, tokenResponse) => {
          // Function returns error object in tokenResponse
          // Invalid Username will return empty tokenResponse, thus err is used
          if (err) {
            reject(tokenResponse === null ? err : tokenResponse);
          }

          resolve(tokenResponse);
      })
    }
  );

}

function getAuthHeader(accessToken) {
  // Function to append Bearer against the Access Token
  return "Bearer ".concat(accessToken);
}

//Microsoft PowerBI - embed token
async function generateEmbedToken() {
  const doc = await getDocument("Settings", "PowerBI");
  const powerbi = doc.data();

  let tokenResponse = null;
  let errorResponse = null;

  // Call the function to get the response from the authentication request
  try {
    tokenResponse = await getAuthToken();
  } catch (err) {
    if (
      err.hasOwnProperty("error_description") &&
      err.hasOwnProperty("error")
    ) {
      errorResponse = err.error_description;
    } else {
      // Invalid PowerBI Username provided
      errorResponse = err.toString();
    }
    return {
      status: 401,
      error: errorResponse
    };
  }

  // Extract AccessToken from the response
  let token = tokenResponse.accessToken;

  // embedData will be used for resolution of the Promise
  let embedData = null;

  // Call the function to get the Report Embed details
  try {
    embedData = await getReportEmbedDetails(
      token,
      powerbi.apiUrl,
      powerbi.workspaceId,
      powerbi.reportId
    );

    // Call the function to get the Embed Token
    /* let embedToken = await getReportEmbedToken(token, powerbi.apiUrl, powerbi.reportId, embedData.data.datasetId);
      return {
          "accessToken": embedToken.token,
          "embedUrl": embedData.data.embedUrl,
          "reportId": embedToken.tokenId,
          "expiry": embedToken.expiration,
          "status": 200
      }; TO-DO: FIX ERROR 403*/
    let pages = await getPages(token, powerbi.apiUrl, powerbi.reportId);

    return {
      accessToken: token,
      embedUrl: embedData.data.embedUrl,
      reportPages: pages.data.value,
      status: 200
    };
  } catch (err) {
    return {
      status: err.response.status,
      error:
        "Error while retrieving report embed details: " +
        err.response.statusText
    };
  }
}

async function getReportEmbedDetails(token, apiUrl, workspaceId, reportId) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: getAuthHeader(token)
  };

  const api = axios.create({ baseURL: apiUrl });

  const result = await api.get(`groups/${workspaceId}/reports/${reportId}`, {
    headers: headers
  });

  if (result.aborted) throw result;

  return result;
}

async function getReportEmbedToken(token, apiUrl, reportId, datasetId) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: getAuthHeader(token)
  };

  const api = axios.create({ baseURL: apiUrl });

  const formData = {
    reports: [
      {
        id: reportId
      }
    ],
    datasets: [
      {
        id: datasetId
      }
    ]
  };

  //Docs on API: https://docs.microsoft.com/en-us/rest/api/power-bi/embedtoken/generatetoken
  const result = await api.post("GenerateToken", {
    headers: headers,
    body: JSON.stringify(formData)
  });
  console.log(result);
  console.log("bye");
  if (!result) throw result;

  return result;
}

// Get report pages
async function getPages(token, apiUrl, reportId) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: getAuthHeader(token)
  };

  const api = axios.create({ baseURL: apiUrl });

  //Docs on API: https://docs.microsoft.com/en-us/rest/api/power-bi/reports/getpages
  const result = await api.get(`reports/${reportId}/pages`, {
    headers: headers
  });

  if (!result) throw result;

  return result;
}

// Routes
router.get("/getReportEmbedToken", async (req, res) => {
  let result = await generateEmbedToken();

  return res.status(result.status).send(result);
});

module.exports = router;

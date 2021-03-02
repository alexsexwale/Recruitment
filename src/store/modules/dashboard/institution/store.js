import db from "@/firebase/init";
import api from "@/store/api/api";
import moment from "moment";
import * as pbi from "powerbi-client";
import "firebase/auth";
import "firebase/firestore";

export default {
  state: {
    loading: false
  },
  getters: {},
  mutations: {},
  actions: {
    getReportConfig: context => {
      return api
        .getEmbedToken()
        .then(embedData => {
          let permissions = pbi.models.Permissions.Read;

          return {
            reportPages: embedData.data.reportPages,
            reportConfig: {
              type: "report",
              tokenType: pbi.models.TokenType.Aad,
              accessToken: embedData.data.accessToken,
              embedUrl: embedData.data.embedUrl,
              permissions: permissions,
              settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
                layoutType: pbi.models.LayoutType.Custom,
                customLayout: {
                  displayOption: pbi.models.DisplayOption.FitToWidth
                }
              }
            }
          };
        })
        .catch(err => {
          db.collection("errors").add({
            created: moment(Date.now()).format("L"),
            issue: err.message,
            message:
              "API get call to 'getReportEmbedToken' failed. Contact tech support immediately."
          });
        });
    }
  }
};

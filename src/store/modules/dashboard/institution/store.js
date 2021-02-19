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
      let loadConfig = api
        .getEmbedToken()
        .then(embedData => {
          let permissions = pbi.models.Permissions.All;

          return {
            type: "report",
            tokenType: pbi.models.TokenType.Embed,
            accessToken: embedData.data.accessToken,
            embedUrl: embedData.data.embedUrl,
            permissions: permissions,
            settings: {
              filterPaneEnabled: false,
              navContentPaneEnabled: false
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
      console.log(loadConfig);
      return loadConfig;
    }
  }
};

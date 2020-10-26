import db from "@/firebase/init";
import api from "@/store/api/api";
import moment from "moment";

export default {
    state: {
        modal: false,
        loading: false,
        error: false,
        success: false,
        subject: "",
        message: ""
    },
    getters: {
        modalSupport: state => state.modal,
        loadingSupport: state => state.loading, 
        successSupport: state => state.success,
        errorSupport: state => state.error
    },
    mutations: {
        support: (state, payload) => {
            state.loading = true;
            if(payload.subject && payload.message) {
                var args = {
                  type: "support",
                  subject: "User Support - " + payload.subject, 
                  message: payload.message
                }
                // Send support
                api.notification(args).then(() => {
                  state.modal = true;
                  state.success = true;
                  state.loading = false;
                  db.collection('support').add({
                    userId: user.uid,
                    created: moment(Date.now()).format('L'),
                    subject: payload.subject,
                    message: payload.message
                  });
                }).catch(err => {
                    console.log(err.message);
                });;
            }
            else {
              state.modal = true;
              state.error = true;
              state.loading = false;
            }
        },
        modalHide: state => {
            state.error = false;
            state.success = false;
            state.modal = false;
        }
    },
    actions: {
        support: (context, payload) => {
            context.commit("support", payload);
        },
        modalHide: context => {
            context.commit("modalHide");
        }
    }
};
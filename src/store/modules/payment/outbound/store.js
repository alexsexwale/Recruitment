import db from "@/firebase/init";
import api from "@/store/api/api";
import moment from "moment";

export default {
    state: {
        modal: false,
        loading: false,
    },
    getters: {
        loadingCC: state => state.loading,
        modalP: state => state.modal
    },
    mutations: {
        complete: (state, payload) => {
            state.loading = true;
            db.collection('payments').doc(payload.id).get().then(doc => {
                if(doc.data().inboundPayment === true) {
                  api.pay(doc.data()).then(() => {
                    state.loading = false;
                  });
                }
                else {
                  console.log("You have not made the inbound payment for the job.");
                }
            });

        },
        dissatisfied: (state, payload) => {
            state.loading = true;
            db.collection('users').doc(payload.clientAlias).get().then(doc => {
                var args = { 
                    jobId: payload.jobId, 
                    email: doc.data().email, 
                    type: "dissatisfied", 
                    subject: "Dissatisfied Job - " + payload.jobId, 
                    message: payload.clientName + " is dissatisfied with the " + payload.name + " job. Contact " + payload.clientName + " at " + doc.data().phone + "." 
                };
                api.notification(args).then(() => {
                    state.loading = false;
                });
                db.collection('micros').doc(payload.jobId).update({
                    complete: false,
                    satisfied: false,
                    status: "dissatisfied",
                    lastModified: moment(Date.now()).format('L')  
                });
            });
        },
        noPaymentModalHide: state => {
            state.modal = false;
        }
    },
    actions: {
        complete: (context, payload) => {
            context.commit("complete", payload);
        },
        dissatisfied: (context, payload) => {
            context.commit("dissatisfied", payload)
        },
        noPaymentModalHide: (context) => {
            context.commit("noPaymentModalHide")
        }
    }
};
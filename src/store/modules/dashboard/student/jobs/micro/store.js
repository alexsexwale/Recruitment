import router from "@/routes/routes";
import api from "@/store/api/api";
import moment from "moment";

export default {
    state: {
        loading: false,

    },
    getters: {

    },
    mutations: {
        cancel: (state, payload) => {
            state.loading = true;
            db.collection('micros').doc(payload.id).update({
                status: "incomplete",
                lastModified: moment(Date.now()).format('L')  
            });
            db.collection(args.type).add({
                jobId: payload.jobId,
                created: moment(Date.now()).format('L'),
                message: args.message,
                description: "",
                reason: ""
            });
            var args = {
                type: "cancelled", 
                subject: "",
                message: ""
            }
            api.notification(args).then(() => {
                state.loading = false;
            }).catch(err => {
                db.collection("errors").add({
                    jobId: payload.jobId,
                    created: moment(Date.now()).format('L'),
                    issue: err.message,
                    message: "API post call to 'notification' failed. Contact tech support immediately."
                });
            });
            state.loading = false;
        }
    },
    actions: {
        cancel: (context, payload) => {
            context.commit("cancel", payload);
        }
    }
}
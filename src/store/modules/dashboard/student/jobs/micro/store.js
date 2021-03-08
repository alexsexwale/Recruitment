import router from "@/routes/routes";
import api from "@/store/api/api";
import moment from "moment";
import 'firebase/auth';
import 'firebase/firestore';

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
                studentCancelled: true,
                lastModified: moment(Date.now()).format('L')  
            });
            db.collection(args.type).add({
                jobId: payload.jobId,
                created: moment(Date.now()).format('L'),
                message: args.message,
                description: "",
                reason: ""
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
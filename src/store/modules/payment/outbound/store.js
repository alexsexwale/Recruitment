import db from "@/firebase/init";
import api from "@/store/api/api";

export default {
    mutations: {
        complete: (state, id) => {
            console.log("complete");
            db.collection('payments').doc(id).get().then(doc => {
                if(doc.data().inboundPayment === true) {
                    api.pay(doc.data());
                }
                else {
                    console.log("You have not made the inbound payment for the job.");
                }
            });
        }
    },
    actions: {
        complete: (context, id) => {
            context.commit("complete", id);
        }
    }
};
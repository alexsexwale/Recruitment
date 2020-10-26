import db from "@/firebase/init";
import axios from "axios";

var api = null;
db.collection("Settings").doc("Backend").get().then(doc => {
    api = axios.create({
        // Dev (comment below before deploying)
        baseURL: doc.data().api, // run local backend server
        // Production (uncomment below before deploying)
        //baseURL: doc.data().api
    })
});

export default {
    // Send email
    notification(args) {
        return api.post("notification", args);
    },
    // Outbound Payment
    pay(args) {
        return api.post("pay", args);
    }
};
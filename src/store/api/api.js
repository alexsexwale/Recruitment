import db from "@/firebase/init";
import 'firebase/auth';
import 'firebase/firestore';
import axios from "axios";

var api = null;
db.collection("Settings").doc("Backend").get().then(doc => {
    api = axios.create({
        //baseURL: doc.data().devApi
        baseURL: doc.data().api
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
    },
    // Get Embed Token
    async getEmbedToken() {
        return await api.get("powerbi/getReportEmbedToken")
    },
    // Download File
    downloadFile(args) {
        return api.get("downloadPdf", args)
    },
    sendPdf(args) {
        return api.post("sendPdf", args)
    },

};
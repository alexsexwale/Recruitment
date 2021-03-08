import db from "@/firebase/init";
import router from "@/routes/routes";
import api from "@/store/api/api";
import moment from "moment";
import 'firebase/auth';
import 'firebase/firestore';

export default {
    state: {
        modal: false,
        loading: false,
        user: {}
    },
    getters: {
        modalAc: state => state.modal,
        loadingAc: state => state.loading
    },
    mutations: {
        clientCancelActive: (state, payload) => {
            state.loading = true;
            db.collection('users').doc(payload.clientAlias).get().then(doc => {
                state.user = doc.data();
                var args = { 
                    jobId: payload.jobId, 
                    email: state.user.email, 
                    type: "incomplete", 
                    subject: "Cancelled an Active Job - " + payload.jobId, 
                    message: state.user.name + " " + state.user.surname + " has cancelled the " + payload.name + " job. Contact the student at " + state.user.phone + "." 
                };
                api.notification(args);
                db.collection('micros').doc(payload.jobId).update({
                    status: "incomplete",
                    satisfied: false,
                    cancelled: true,
                    lastModified: moment(Date.now()).format('L') 
                });
            });
            state.loading = false;
        },
        acceptJob: (state, payload) => {
            state.loading = true;
            db.collection('micros').doc(payload.jobId).update({
                status: "active",
                studentId: payload.studentId,
                studentEmail: payload.applicantEmail,
                studentName: payload.applicant,
                studentAlias: payload.alias,
                lastModified: moment(Date.now()).format('L')
            });
            db.collection('payments').doc(payload.jobId).update({
                studentAlias: payload.alias
            });
            var args = {
                type: "active",
                subject: payload.jobId + " job is active",
                message: payload.applicant + " has accepted the job offer. You can find the job using the job id, " + payload.jobId
            };
            api.notification(args);
            state.loading = false;
        },
        studentCancelActive: (state, payload) => {
            state.loading = true;
            db.collection('users').doc(payload.studentAlias).get().then(doc => {
                state.user = doc.data();
                db.collection('users').doc(payload.clientAlias).get().then(doc => {
                    var client = doc.data();
                    var args = {
                        jobId: payload.jobId, 
                        email: state.user.email, 
                        type: "incomplete", 
                        subject: "Cancelled an Active Job - " + payload.jobId, 
                        message: state.user.name + " " + state.user.surname + " has cancelled the " + payload.name + " job. Contact the student at" +  state.user.phone + ". Contact the client " + payload.clientName + " at " + client.phone + "." 
                    };
                    api.notification(args);
                });
                
                db.collection('micros').doc(payload.jobId).update({
                    status: "incomplete",
                    satisfied: false,
                    cancelled: true,
                    lastModified: moment(Date.now()).format('L') 
                });
            });
            state.loading = false;
        },
        studentDeclineSelect: (state, payload) => {
            state.loading = true;
            db.collection("users").doc(payload.alias).get().then(doc => {
                state.user = doc.data();
                var userId = doc.id;
                db.collection("applications").doc(payload.id).update({
                    approved: false,
                    status: 'decline',
                    jobId: null, 
                    lastModified: moment(Date.now()).format('L'),
                });
                router.push({ name: "student-profile", params: {id: userId} });
            });
            state.loading = false;
        },
        studentCancelSelect: (state, payload) => {
            state.loading = true;
            console.log(payload)
            db.collection("users").doc(payload.alias).get().then(doc => {
              db.collection("applications").doc(payload.id).update({
                status: 'cancel', 
                jobId: null,
                lastModified: moment(Date.now()).format('L'),
              });
              router.push({ name: "student-profile", params: {id: doc.id} });
              state.loading = false;
            });
        },
        downloadPdf: (state, payload) => {
            return db.collection("invoices").doc(payload.id).get().then(async doc => {
              let invoice = doc.data();
              let args = {
                  bucket: invoice.bucket,
                  filePath: invoice.filePath
              }
              
              return await api.downloadPdf(args);
            });
        },
        sendPdf: (state, payload) => {
          state.loading = true;
          db.collection('users').doc(payload.clientAlias).get().then(doc => {
            state.user = doc.data();
            db.collection('invoices').doc(payload.id).get().then(doc => {
              let invoice = doc.data();
              let datetime = moment(Date.now()).format('L');
              let args = {
                  bucket: invoice.bucket,
                  filePath: invoice.filePath,
                  email: state.user.email,
                  subject: `Jobox Invoice Job - ${payload.jobId}`,
                  message: `Please find the invoice for job with job id, ${payload.jobId}, requested on ${datetime} attached.`
              }
            
              api.sendPdf(args);
            });
          });

          state.loading = false;
        }
    },
    actions: {
        clientCancelActive: (context, payload) => {
            context.commit("clientCancelActive", payload);
        },
        acceptJob: (context, payload) => {
            context.commit("acceptJob", payload);
        },
        studentCancelActive: (context, payload) => {
            context.commit("studentCancelActive", payload);
        },
        studentDeclineSelect: (context, payload) => {
            context.commit("studentDeclineSelect", payload);
        },
        studentCancelSelect: (context, payload) => {
            context.commit("studentCancelSelect", payload);
        },
        downloadPdf: (context, payload) => {
          return context.commit("downloadPdf", payload);
        },
        sendPdf: (context, payload) => {
          context.commit("sendPdf", payload);
        }
    }
};
import db from '@/firebase/init';
import firebase from "firebase/app";
import router from "@/routes/routes";
import api from "@/store/api/api";
import moment from "moment";

export default {
    state: {
        messageSuccessModal: "In the collection 'ContentManagent', the document id 'Forgot Password Success Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        messageErrorModal: "In the collection 'ContentManagent', the document id 'Forgot Password Error Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        solutionSuccessModal: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103547028/Forgot+Password+Success+Modal",
        solutionErrorModal: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103547028/Forgot+Password+Success+Modal",
        otherMessageSuccessModal: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Forgot Password Success Modal'",
        otherMessageErrorModal: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Forgot Password Error Modal'",
        header: null,
        body: null,
        footer: null,
        modal: false,
        loading: false,
        success: false,
        error: false,
        content: null
    },
    getters: {
        headerFP: state => state.header,
        bodyFP: state => state.body,
        footerFP: state => state.footer,
        modalFP: state => state.modal,
        loadingFP: state => state.loading,
        successFP: state => state.success,
        errorFP: state => state.error
    },
    mutations: {
        forgot: (state, payload) => {
            if(payload.email) {
                state.loading = true;
                firebase.auth().sendPasswordResetEmail(payload.email)
                .then(() => {
                    db.collection("ContentManagement").doc("Forgot Password Success Modal").get().then(doc => {
                        state.content = doc.data();
                        state.loading = false;
                        state.header = state.content.header;
                        state.body = state.content.body;
                        state.footer = state.content.footer;
                        state.modal = true;
                        state.success = true;
                    })
                    .catch(errCMS => {
                        state.loading = false;
                        state.header = "Email Sent!";
                        state.body = "Go ahead and check your inbox to reset your password.";
                        state.footer = "Got it"
                        state.modal = true;
                        state.success = true;
                        if(errCMS.message = "Cannot read property 'header' of undefined") {
                            var args = {
                                type: "errors",
                                subject: errCMS.message, 
                                message: state.messageSuccessModal + state.solutionSuccessModal
                            }
                            // Send error to tech support
                            api.notification(args).then(() => {
                                state.loading = false;
                                state.header = "Oops!";
                                state.body = err.message;
                                state.footer = "Got it";
                            }).catch(errAPI => {
                                state.loading = false;
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errAPI.message,
                                    message: "API post call to 'notification' failed. Contact tech support immediately."
                                });
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errCMS.message,
                                    message: state.messageSuccessModal + state.solutionSuccessModal
                                });
                            });
                        }
                        else {
                            var args = {
                                type: "errors",
                                subject: errCMS.message, 
                                message: state.otherMessageSuccessModal
                            }
                            // Send error to tech support
                           api.notification(args).then(() => {
                                state.loading = false;
                                state.header = "Oops!";
                                state.body = err.message;
                                state.footer = "Got it";
                            }).catch(errAPI => {
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errAPI.message,
                                    message: "API post call to 'notification' failed. Contact tech support immediately."
                                });
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errCMS.message,
                                    message: state.otherMessageSuccessModal
                                });
                            });
                        }
                    });
                })
                .catch(err => {
                    db.collection("ContentManagement").doc("Forgot Password Error Modal").get().then(doc => {
                        state.content = doc.data();
                        state.loading = false;
                        state.header = state.content.header;
                        state.body = err.message;
                        state.footer = state.content.footer;
                        state.modal = true;
                        state.error = true;
                    })
                    .catch(errCMS => {
                        state.loading = false;
                        state.header = "Oops";
                        state.body = err.message;
                        state.footer = "Got it";
                        state.modal = true;
                        state.error = true;
                        if(errCMS.message = "Cannot read property 'header' of undefined") {
                            var args = {
                                type: "errors",
                                subject: errCMS.message, 
                                message: state.messageErrorModal + state.solutionErrorModal
                            }
                            // Send error to tech support
                           api.notification(args).then(() => {
                                state.loading = false;
                                state.header = "Oops!";
                                state.body = err.message;
                                state.footer = "Got it";
                            }).catch(errAPI => {
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errAPI.message,
                                    message: "API post call to 'notification' failed. Contact tech support immediately."
                                });
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errCMS.message,
                                    message: state.messageErrorModal + state.solutionErrorModal
                                });
                            });
                        }
                        else {
                            var args = {
                                type: "errors",
                                subject: errCMS.message, 
                                message: state.otherMessageErrorModal
                            }
                            // Send error to tech support
                           api.notification(args).then(() => {
                                state.loading = false;
                                state.header = "Oops!";
                                state.body = err.message;
                                state.footer = "Got it";
                            }).catch(errAPI => {
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errAPI.message,
                                    message: "API post call to 'notification' failed. Contact tech support immediately."
                                });
                                db.collection(args.type).add({
                                    jobId: null,
                                    created: moment(Date.now()).format('L'),
                                    issue: errCMS.message,
                                    message: state.otherMessageErrorModal
                                });
                            });
                        }
                    });
                });
            }
            else {
                db.collection("ContentManagement").doc("Forgot Password Error Modal").get().then(doc => {
                    state.content = doc.data();
                    state.loading = false;
                    state.header = state.content.header;
                    state.body = "Your email was not entered.";
                    state.footer = state.content.footer;
                    state.modal = true;
                    state.error = true;
                })
                .catch(errCMS => {
                    state.loading = false;
                    state.header = "Oops!";
                    state.body = "Your email was not entered.";
                    state.footer = "Got it";
                    state.modal = true;
                    state.error = true;
                    if(errCMS.message = "Cannot read property 'header' of undefined") {
                        var args = {
                            type: "errors",
                            subject: errCMS.message, 
                            message: state.messageErrorModal + state.solutionErrorModal
                        }
                        // Send error to tech support
                       api.notification(args).then(() => {
                            state.loading = false;
                            state.header = "Oops!";
                            state.body = err.message;
                            state.footer = "Got it";
                        }).catch(errAPI => {
                            db.collection(args.type).add({
                                jobId: null,
                                created: moment(Date.now()).format('L'),
                                issue: errAPI.message,
                                message: "API post call to 'notification' failed. Contact tech support immediately."
                            });
                            db.collection(args.type).add({
                                jobId: null,
                                created: moment(Date.now()).format('L'),
                                issue: errCMS.message,
                                message: state.messageErrorModal + state.solutionErrorModal
                            });
                        });
                    }
                    else {
                        var args = {
                            type: "errors",
                            subject: errCMS.message, 
                            message: state.otherMessageErrorModal
                        }
                        // Send error to tech support
                       api.notification(args).then(() => {
                            state.loading = false;
                            state.header = "Oops!";
                            state.body = err.message;
                            state.footer = "Got it";
                        }).catch(errAPI => {
                            db.collection(args.type).add({
                                jobId: null,
                                created: moment(Date.now()).format('L'),
                                issue: errAPI.message,
                                message: "API post call to 'notification' failed. Contact tech support immediately."
                            });
                            db.collection(args.type).add({
                                jobId: null,
                                created: moment(Date.now()).format('L'),
                                issue: errCMS.message,
                                message: state.otherMessageErrorModal
                            });
                        });
                    }
                });
            }
        },
        sent: state => {
            router.push({ name: 'Login'});
            state.success = false;
            state.modal = false;
        },
        modalHide: state => {
            state.error = false;
            state.modal = false;
            
        }
    },
    actions: {
        forgot: (context, payload) => {
            context.commit("forgot", payload);
        },
        sent: context => {
            context.commit("sent");
        },
        modalHide: context => {
            context.commit("modalHide");
        }
    }
};
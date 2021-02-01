import db from "@/firebase/init";
import firebase from "firebase/app";
import router from "@/routes/routes";
import api from "@/store/api/api";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';
import moment from "moment";

export default {
    state: {
        message: "In the collection 'ContentManagent', the document id 'Login Error Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        solution: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103677976/Login+Error+Modal",
        otherMessage: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Login Error Modal'",
        header: null,
        body: null,
        footer: null,
        modal: false,
        loading: false,
        user: null,
        client: null,
        student: null,
        content: null
    },
    getters: {
        headerL: state => state.header,
        bodyL: state => state.body,
        footerL: state => state.footer,
        modalL: state => state.modal,
        loadingL: state => state.loading
    },
    mutations: {
        login: (state, payload) => {
            if(payload.email && payload.password) {
                state.loading = true;
                let auth = firebase.auth();
                auth.signInWithEmailAndPassword(payload.email, payload.password).then(() => {
                    db.collection("users").where('userId', '==', auth.currentUser.uid).get().then(snapshot => {
                        snapshot.forEach(doc => {
                            state.user = doc.data();
                            if(state.user.user == "client") {
                                let client = db.collection("clients").doc(doc.id);
                                client.get().then(doc => {
                                    state.client = doc.data();
                                    if(doc.exists && state.client.accountCreated) {
                                        router.push({ name: "client-profile", params: {id: doc.id} });
                                        state.loading = false;
                                    }
                                    else {
                                        router.push({ name: "create-client-account" });
                                        state.loading = false;
                                    }
                                });
                            }
                            else {
                                let student = db.collection("students").doc(doc.id);
                                student.get().then(doc => {
                                    if(doc.exists && doc.data().accountCreated) {
                                        router.push({ name: "student-profile", params: {id: doc.id} });
                                    }
                                    else {
                                        router.push({ name: "create-student-account" });
                                    }
                                });
                            }
                        });
                    }).catch(err => {
                        db.collection("ContentManagement").doc("Login Error Modal").get().then(doc => {
                            state.content = doc.data();
                            state.loading = false;
                            state.header = state.content.header;
                            state.body = err.message;
                            state.footer = state.content.footer;
                            state.modal = true;
                        }).catch(errCMS => {
                            state.loading = false;
                            state.header = "Whoa there! ✋";
                            state.body = err.message;
                            state.footer = "Got it";
                            state.modal = true;
                            if(errCMS.message = "Cannot read property 'header' of undefined") {
                                var args = { type: "errors", subject: errCMS.message, message: state.message + state.solution };
                                // Send error to tech support
                                api.notification(args).then(() => {
                                    state.loading = false;
                                    state.header = "Whoa there! ✋";
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
                                        message: state.message + state.solution
                                    });
                                });
                            }
                            else {
                                var args = { type: "errors", subject: errCMS.message, message: state.otherMessage };
                                // Send error to tech support
                                api.notification(args).then(() => {
                                    state.loading = false;
                                    state.header = "Whoa there! ✋";
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
                                        message: state.otherMessage
                                    });
                                });
                            }
                        });
                    });
                })
                .catch(err => {
                    db.collection("ContentManagement").doc("Login Error Modal").get().then(doc => {
                        state.content = doc.data();
                        state.loading = false;
                        state.header = state.content.header;
                        state.body = err.message;
                        state.footer = state.content.footer;
                        state.modal = true;
                    }).catch(errCMS => {
                        if(errCMS.message = "Cannot read property 'header' of undefined") {
                            var args = { type: "errors", subject: errCMS.message, message: state.message + state.solution };
                            // Send error to tech support
                            api.notification(args).then(() => {
                                state.loading = false;
                                state.header = "Whoa there! ✋";
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
                                    message: state.message + state.solution
                                });
                            });
                        }
                        else {
                            var args = { type: "errors", subject: errCMS.message, message: state.otherMessage };
                            // Send error to tech support
                            api.notification(args).then(() => {
                                state.loading = false;
                                state.header = "Whoa there! ✋";
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
                                    message: state.otherMessage
                                });
                            });
                        }
                    });
                });
            }
            else {
                db.collection("ContentManagement").doc("Login Error Modal").get().then(doc => {
                    state.content = doc.data();
                    state.loading = false;
                    state.header = state.content.header;
                    state.body = state.content.body;
                    state.footer = state.content.footer;
                    state.modal = true;
                }).catch(errCMS => {
                    state.loading = false;
                    state.header = "Whoa there! ✋";
                    state.body = "Please select whether you are a student or a client.";
                    state.footer = "Got it";
                    state.modal = true;
                    if(errCMS.message = "Cannot read property 'header' of undefined") {
                        var args = {
                            type: "errors",
                            subject: errCMS.message, 
                            message: state.message + state.solution
                        }
                        // Send error to tech support
                        api.notification(args).then(() => {
                            state.loading = false;
                            state.header = "Whoa there! ✋";
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
                                message: state.message + state.solution
                            });
                        });
                    }
                    else {
                        var args = {
                            type: "errors",
                            subject: errCMS.message, 
                            message: state.otherMessage
                        }
                        // Send error to tech support
                        api.notification(args).then(() => {
                            state.loading = false;
                            state.header = "Whoa there! ✋";
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
                                message: state.otherMessage
                            });
                        });
                    }
                });
            }
        },
        modalHide: state => {
            state.modal = false;
        }
    },
    actions: {
        login: (context, payload) => {
            context.commit("login", payload);
        },
        modalHide: context => {
            context.commit("modalHide");
        }
    }
};
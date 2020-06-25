import db from "@/firebase/init";
import firebase from "firebase/app";
import moment from "moment";
import slugify from "slugify";
import router from "@/routes/routes";
import api from "@/store/api/api";

function random() {
    let rand1 = Math.floor(Math.random() * 10).toString(); let rand2 = Math.floor(Math.random() * 10).toString();
    let rand3 = Math.floor(Math.random() * 10).toString(); let rand4 = Math.floor(Math.random() * 10).toString();
    return rand1 + rand2 + rand3 + rand4;
}

export default {
    state: {
        solutionSuccessModal: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103514226/Register+Success+Modal",
        solutionErrorModal: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103514212/Register+Error+Modal",
        messageSuccessModal: "In the collection 'ContentManagent', the document id 'Register Success Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        messageErrorModal: "In the collection 'ContentManagent', the document id 'Register Error Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        otherMessageSuccessModal: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Register Success Modal'",
        otherMessageErrorModal: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Register Error Modal'",
        // <Modal>
        header: null,
        body: null,
        footer: null,
        modal: false,
        //</Modal>
        loading: false,
        success: false,
        error: false,
        content: null,
        role: null,
        slug: null
    },
    getters: {
        // <Modal>
        headerR: state => state.header,
        bodyR: state => state.body,
        footerR: state => state.footer,
        modalR: state => state.modal,
        //</Modal>
        loadingR: state => state.loading,
        successR: state => state.success,
        errorR: state => state.error
    },
    mutations: {
        register: (state, payload) => {
            state.loading = true;
            if(!payload.terms) {
                db.collection("ContentManagement").doc("Register - Terms Modal").get().then(doc => {
                    state.content = doc.data();
                    state.loading = false;
                    state.header = state.content.header;
                    state.body = state.content.body;
                    state.footer = state.content.footer;
                    state.modal = true;
                    state.error = true;
                })
                .catch(errCMS => {
                    state.loading = false;
                    state.header = "Oops!";
                    state.body = "Please agree to the terms and conditions";
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
            }
            else if(payload.role && payload.firstName && payload.lastName && payload.email && payload.password) {
                state.slug = slugify(payload.firstName + " " + payload.lastName + " " + random(), {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });
                db.collection("users").doc(state.slug).get().then(doc => {
                    if(doc.exists) {
                        state.loading = false;
                        state.modal = true;
                        state.header = "Oops!";
                        state.body = "Well this is awkward... Try register again";
                        state.footer = "Got it";
                        state.error = true;
                    }
                    else {
                        state.role = payload.role; //used to proceed
                        console.log()
                        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(cred => {
                            db.collection("users").doc(state.slug).set({
                                userId: cred.user.uid,
                                created: moment(Date.now()).format('L'),
                                lastModified: null,
                                name: payload.firstName,
                                surname: payload.lastName,
                                phone: payload.phoneNumber,
                                email: payload.email,
                                role: payload.role,
                                terms_and_conditions: payload.terms,
                                alias: state.slug
                            });
                            cred.user.updateProfile({
                                displayName: payload.firstName + " " + payload.lastName
                            })
                            .catch(err => {
                                state.loading = false;
                                state.modal = true;
                                state.header = "Oops!";
                                state.body = err.message;
                                state.footer = "Got it";
                                state.error = true;
                            });
                        })
                        .then(() => {
                            state.body = null;
                            firebase.auth().currentUser.sendEmailVerification().then(() => {
                                state.loading = false;
                                state.modal = true;
                                state.header = "Verify Email!";
                                state.body = "You have been successfully registered.\n\nCheck your inbox and verify your email";
                                state.footer = "Got it";
                                state.success = true;
                            }).catch(err => {
                                state.loading = false;
                                state.modal = true;
                                state.header = "Oops!";
                                state.body = err.message;
                                state.footer = "Got it";
                                state.error = true;
                            });
                        })
                        .catch(err => {
                            state.loading = false;
                            state.modal = true;
                            state.header = "Oops!";
                            state.body = err.message;
                            state.footer = "Got it";
                            state.error = true;
                        });
                    }
                });
            }
            else {
                state.loading = false;
                state.modal = true;
                state.header = "Oops!";
                state.body = "Please select whether you are a student or a client.";
                state.footer = "Got it";
                state.error = true;
            }
        },
        proceed: state => {
            state.loading = true;
            if(state.role === "student")
                router.push({ name: "create-student-account" });
            else
                router.push({ name: "create-client-account" });
            state.role = null;
            state.loading = false;
        },
        termsAndCondition: () => {
            let terms = router.resolve({ name: "terms-and-conditions" });
            window.open(terms.href, "_blank");
        },
        modalHide: state => {
            state.error = false;
            state.modal = false;
            state.body = null;
        }
    },
    actions: {
        register: (context, payload) => {
            context.commit("register", payload);
        },
        proceed: context => {
            context.commit("proceed");
        },
        termsAndCondition: context => {
            context.commit("termsAndCondition");
        },
        modalHide: context => {
            context.commit("modalHide");
        }
    }
}
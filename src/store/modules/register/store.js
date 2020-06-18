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
        solutionSuccessModal: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103547028/Forgot+Password+Success+Modal",
        solutionErrorModal: "https://jobox.atlassian.net/wiki/spaces/JWA/pages/103547028/Forgot+Password+Success+Modal",
        messageSuccessModal: "In the collection 'ContentManagent', the document id 'Forgot Password Success Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        messageErrorModal: "In the collection 'ContentManagent', the document id 'Forgot Password Error Modal' may be missing.\n\nPlease click the link to review the confluence page to see how to resolve the issue. ",
        otherMessageSuccessModal: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Forgot Password Success Modal'",
        otherMessageErrorModal: "Contact tech support immediately. Issue is related to the collection 'ContentManagent' in the document id 'Forgot Password Error Modal'",
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
                state.loading = false;
                state.modal = true;
                state.header = "Oops!";
                state.body = "Please agree to the terms and conditions";
                state.footer = "Got it";
                state.error = true;
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
import db from "@/firebase/init";
import moment from "moment";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
    state: {
        modal: false,
        loading: false,
        error: false,
        success: false,
        subject: "",
        message: ""
    },
    getters: {
        modalSupport: state => state.modal,
        loadingSupport: state => state.loading, 
        successSupport: state => state.success,
        errorSupport: state => state.error
    },
    mutations: {
        support: (state, payload) => {
            state.loading = true;
            if(payload.subject && payload.message) {
                db.collection("users").where("userId", "==", firebase.auth().currentUser.uid).get()
                .then(snapshot => {
                  snapshot.forEach(doc => {
                    db.collection('support').add({
                      userId: firebase.auth().currentUser.uid,
                      name: doc.data().name,
                      surname: doc.data().surname,
                      email: doc.data().email,
                      phone: doc.data().phone,
                      created: moment(Date.now()).format('L'),
                      subject: payload.subject,
                      message: payload.message + " \n\nYou can contact " + doc.data().name + " " + doc.data().surname + " at " + doc.data().phone
                    });
                    state.modal = true;
                    state.success = true;
                    state.loading = false;
                  });
                });
            }
            else {
              state.modal = true;
              state.error = true;
              state.loading = false;
            }
        },
        modalHide: state => {
            state.error = false;
            state.success = false;
            state.modal = false;
        }
    },
    actions: {
        support: (context, payload) => {
            context.commit("support", payload);
        },
        modalHide: context => {
            context.commit("modalHide");
        }
    }
};
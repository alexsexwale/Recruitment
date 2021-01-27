// Vue
import Vue from "vue";
import Router from "vue-router";
// Firebase
import db from "@/firebase/init";
import firebase from "firebase/app";
// Routes
import Auth from "./auth/auth";
import StudentDashboard from "./student/student";
import ClientDashboard from "./client/client";
import ClientAccount from "./client/account/account";
import StudentAccount from "./student/account/account";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "login", name: "Login" },
    Auth,
    ClientAccount,
    StudentAccount,
    ClientDashboard,
    StudentDashboard
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
});

function previous(back) {
  router.go(back);
}

router.beforeEach((to, from, next) => {
  // checking to see if route requires authentication
  let requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
  // check authentication state of user
  let user = firebase.auth().currentUser;
  // if the user has authentication information
  if (requiresAuth) {
    // if the user is signed in
    if (user) {
      let ref = db.collection("users");
      // find the users details in the database
      ref.where("userId", "==", user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // the user role is either a student or a client
          let userPermission = doc.data().user;
          // checking to see if the user role matches
          let userRoleExist = to.matched.some(rec => rec.meta.userRole == userPermission);
          // if user role matches
          if (userRoleExist) {
            // checking to see if user's email has been verified
            let emailVerified = to.matched.some(rec => rec.meta.emailVerified == user.emailVerified);
            // checking to see if user is directing to student account page
            let studentAccount = to.matched.some(rec => rec.name == "create-student-account");
            // or directing to client account page
            let clientAccount = to.matched.some(rec => rec.name == "create-client-account");
            // if the email is verified
            if (emailVerified) {
              next();
            } // else if the email account is not verified but directing to student or client account page
            else if (!emailVerified && (clientAccount || studentAccount)) {
              next();
            } // otherwise the email account has not been verified and not directing to student or client account page
            else {
              previous(-1);
            }
          } // otherwise the user role does not match
          else {
            previous(-1);
          }
        });
      });
    } // otherwise no user has signed in
    else {
      previous(-1);
    }
  } // logout if the user does not require auth but user is authenticated  
  else if(!requiresAuth && user) {
    firebase.auth().signOut().then(() => { next(); });
  } 
  // otherwise the user does not require authentication
  else {
    next();
  }
});

export default router;
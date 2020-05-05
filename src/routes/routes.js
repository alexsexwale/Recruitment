// Vue
import Vue from "vue";
import Router from "vue-router";

// Firebase
import db from "@/firebase/init";
import firebase from "firebase/app";

// Client and Student Dashboard Components
import DashboardLayout from "@/components/Layout/DashboardLayout.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";

// Client Dashboard Components
import ClientDashboard from "@/views/dashboard/client/ClientDashboard.vue";
import ClientProfile from "@/views/dashboard/client/profile/Profile.vue";
import EditClientProfile from "@/views/dashboard/client/profile/EditProfile.vue";

// Post Jobs
import PostMicro from "@/views/dashboard/client/jobs/post/micro/PostJob.vue";

// Edit Job
import EditMicro from "@/views/dashboard/client/jobs/edit/micro/EditJob.vue";

// Cancelled Job
import CancelJob from "@/views/dashboard/client/jobs/cancel/Cancel.vue";

// Dissatisfied Job
import DissatisfiedJob from "@/views/dashboard/client/jobs/dissatisfied/Dissatisfied.vue";

// Client Job
import PendingJob from "@/views/dashboard/client/jobs/pending/PendingJob.vue";
import ActiveJob from "@/views/dashboard/client/jobs/active/ActiveJob.vue";
import ClientCompleteJob from "@/views/dashboard/client/jobs/complete/CompleteJob.vue";
import ClientIncompleteJob from "@/views/dashboard/client/jobs/incomplete/IncompleteJob";

// Job Statuses
import MicroStatus from "@/views/dashboard/client/jobs/status/micro/Status.vue";
//import ReccuringStatus from "";
//import InternshipStatus from "";
//import PartTimeStatus from "";
//import FullTimeStatus from "";

//import Payment from "@/views/dashboard/client/jobs/payment/Payment.vue";

// Student Dashboard Components
import StudentDashboard from "@/views/dashboard/student/StudentDashboard.vue";
import StudentProfile from "@/views/dashboard/student/profile/Profile.vue";
import EditStudentProfile from "@/views/dashboard/student/profile/EditProfile.vue";

import Jobs from "@/views/dashboard/student/jobs/Jobs.vue";
import MicroApplication from "@/views/dashboard/student/jobs/application/micro/Application.vue";

import Applied from "@/views/dashboard/student/jobs/applied/Applied.vue";
import ActiveStudentJob from "@/views/dashboard/student/jobs/active/Active.vue";
import CompleteStudentJob from "@/views/dashboard/student/jobs/complete/Complete.vue";

import StudentStatus from "@/views/dashboard/student/jobs/status/Status.vue";

// Views
import AuthLayout from "@/views/AuthLayout.vue";
import Register from "@/views/register/Register.vue";
import Login from "@/views/login/Login.vue";
import ForgotPassword from "@/views/forgotPassword/ForgotPassword.vue";
import Configuration from "@/views/configuration/Configuration.vue";
import Contact from "@/views/contact/Contact.vue";
import Faq from "@/views/faq/Faq.vue";
import PrivacyPolicy from "@/views/privacyPolicy/PrivacyPolicy.vue";
import TermsAndConditions from "@/views/T&Cs/TermsAndConditions.vue";
import Partner from "@/views/partner/Partner.vue";

// Create Account
import StudentAccount from "@/views/register/student/StudentAccount.vue";
import ClientAccount from "@/views/register/client/ClientAccount.vue";

// Client Dashboard
let client_dashboard_menu = {
  path: "/client",
  component: DashboardLayout,
  name: "client-nav-menu",
  redirect: "/client/jobs/micro/post",
  children: [
    {
      path: "dashboard",
      name: "client-dashboard",
      components: { default: ClientDashboard },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "jobs/micro/post",
      name: "post-a-job",
      components: { default: PostMicro },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true,
        jobType: "micro"
      }
    },
    {
      path: "jobs/micro/edit/:id",
      name: "edit-micro-job",
      components: { default: EditMicro },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "jobs/active",
      name: "active-jobs",
      components: { default: ActiveJob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "jobs/pending",
      name: "pending-jobs",
      components: { default: PendingJob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "jobs/complete",
      name: "complete-jobs",
      components: { default: ClientCompleteJob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "jobs/complete",
      name: "complete-jobs",
      components: { default: ClientIncompleteJob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "support",
      name: "get-support",
      component: Support,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "feedback",
      name: "give-feedback",
      component: Feedback,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "profile/edit/:id",
      name: "edit-client-profile",
      component: EditClientProfile,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "profile/:id",
      name: "client-profile",
      component: ClientProfile,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "profile/:id",
      name: "view-student-profile",
      component: StudentProfile,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "jobs/micro/status/:id",
      name: "client-micro-status",
      component: MicroStatus,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true,
        jobType: "micro"
      }
    },
    {
      path: "cancel/:id",
      name: "client-cancel",
      component: CancelJob,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "dissatisfied/:id",
      name: "client-dissatisfied",
      component: DissatisfiedJob,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "/faq",
      name: "Faq",
      component: Faq,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: PrivacyPolicy,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      component: TermsAndConditions,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    }
  ]
};

// Student Dashboard
let student_dashboard_menu = {
  path: "/student",
  component: DashboardLayout,
  name: "student-nav-menu",
  redirect: "/student/apply-for-job",
  children: [
    {
      path: "dashboard",
      name: "student-dashboard",
      components: { default: StudentDashboard },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "apply-for-job",
      name: "apply",
      components: { default: Jobs },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "jobs/micro/application/:id",
      name: "micro-application",
      components: { default: MicroApplication },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true,
        jobType: "micro"
      }
    },
    {
      path: "jobs/active",
      name: "active-student-jobs",
      components: { default: ActiveStudentJob },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "jobs/applied",
      name: "applied-student-jobs",
      components: { default: Applied },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "jobs/complete",
      name: "complete-student-jobs",
      components: { default: CompleteStudentJob },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "support",
      name: "get-student-support",
      component: Support,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "feedback",
      name: "give-student-feedback",
      component: Feedback,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "profile/edit/:id",
      name: "edit-student-profile",
      component: EditStudentProfile,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "profile/:id",
      name: "student-profile",
      component: StudentProfile,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "profile/:id",
      name: "view-client-profile",
      component: ClientProfile,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "jobs/micro/status/:id",
      name: "student-micro-status",
      component: StudentStatus,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "/faq",
      name: "student-faq",
      component: Faq,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "/privacy-policy",
      name: "student-privacy-policy",
      component: PrivacyPolicy,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "/terms-and-conditions",
      name: "student-terms-and-conditions",
      component: TermsAndConditions,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    }
  ]
};

let clientSignUp = {
  path: "/new-client",
  component: AuthLayout,
  name: "client-account",
  children: [
    {
      path: "/create-account",
      name: "create-client-account",
      components: { default: ClientAccount },
      meta: {
        requiresAuth: true,
        userRole: "client"
      }
    }
  ]
}

let studentSignUp = {
  path: "/new-student",
  component: AuthLayout,
  name: "student-account",
  children: [
    {
      path: "/create-account",
      name: "create-student-account",
      components: { default: StudentAccount },
      meta: {
        requiresAuth: true,
        userRole: "student"
      }
    }
  ]
}

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword
    },
    {
      path: "/configuration",
      name: "Configuration",
      component: Configuration
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    {
      path: "/faq",
      name: "client-faq",
      component: Faq
    },
    {
      path: "/privacy-policy",
      name: "client-privacy-policy",
      component: PrivacyPolicy
    },
    {
      path: "/terms-and-conditions",
      name: "client-terms-and-conditions",
      component: TermsAndConditions
    },
    {
      path: "/partner",
      name: "become-a-partner",
      component: Partner
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
};

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "login",
      name: "Home"
    },
    authPages,
    clientSignUp,
    studentSignUp,
    client_dashboard_menu,
    student_dashboard_menu
  ]
});

function previous() {
  const previous = -1;
  //redirect to previous page
  router.go(previous);
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
          // the user role is either student or client
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
              previous();
            }
          } // otherwise the user role does not match
          else {
            previous();
          }
        });
      });
    } // otherwise no user has signed in
    else {
      previous();
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
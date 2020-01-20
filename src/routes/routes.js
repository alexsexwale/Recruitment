import Vue from "vue";
import Router from "vue-router";

// Firebase
import db from "@/firebase/init";
import firebase from "firebase";

// Common Dashboard Components
import ActiveMicrojob from "@/views/dashboard/view-microjobs/active/ActiveMicrojob.vue";
import PendingMicrojob from "@/views/dashboard/view-microjobs/pending/PendingMicrojob.vue";
import CompleteMicrojob from "@/views/dashboard/view-microjobs/complete/CompleteMicrojob.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";
import DashboardLayout from "@/components/Layout/DashboardLayout.vue";

// Client Dashboard Components
import ClientDashboard from "@/views/dashboard/client-dashboard/ClientDashboard.vue";
import EditClientProfile from "@/views/dashboard/client-dashboard/clientProfile/EditProfile.vue";
import PostAJob from "@/views/dashboard/client-dashboard/jobs/post/PostAJob.vue";
import EditAJob from "@/views/dashboard/client-dashboard/jobs/edit/EditAJob.vue";

// Student Dashboard Components
import StudentDashboard from "@/views/dashboard/student-dashboard/StudentDashboard.vue";
import EditStudentProfile from "@/views/dashboard/student-dashboard/studentProfile/EditProfile.vue";

import ApplyMicrojob from "@/views/dashboard/student-dashboard/microjobs/apply/ApplyMicrojob.vue";

// Pages
import Lock from "@/pages/Dashboard/Pages/Lock.vue";

// Views
import AuthLayout from "@/views/AuthLayout.vue";
import Login from "@/views/login/Login.vue";
import ForgotPassword from "@/views/forgotPassword/ForgotPassword.vue";
import Contact from "@/views/contact/Contact.vue";
import Faq from "@/views/faq/Faq.vue";
import PrivacyPolicy from "@/views/privacyPolicy/PrivacyPolicy.vue";
import TermsAndConditions from "@/views/T&Cs/TermsAndConditions.vue";
import Partner from "@/views/partner/Partner.vue";

// Form - Register
import Register from "@/views/register/Register.vue";
import StudentAccount from "@/views/register/student/StudentAccount.vue";
import ClientAccount from "@/views/register/client/ClientAccount.vue";

// Client Dashboard
let client_dashboard_menu = {
  path: "/client",
  component: DashboardLayout,
  name: "client nav menu",
  redirect: "/client/dashboard",
  children: [
    {
      path: "create-account",
      name: "create-client-account",
      components: { default: ClientAccount },
      props: true,
      meta: {
        requiresAuth: true,
        userRole: "client"
      }
    },
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
      path: "microjobs/post",
      name: "post-a-job",
      components: { default: PostAJob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "microjobs/edit",
      name: "Edit Microjob",
      components: { default: EditAJob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "microjobs/active",
      name: "Active Microjobs",
      components: { default: ActiveMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "microjobs/pending",
      name: "Pending Microjobs",
      components: { default: PendingMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "microjobs/complete",
      name: "Complete Microjobs",
      components: { default: CompleteMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "support",
      name: "Get Support",
      component: Support,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "feedback",
      name: "Give feedback",
      component: Feedback,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    },
    {
      path: "edit-profile",
      name: "Edit Profile",
      component: EditClientProfile,
      meta: {
        requiresAuth: true,
        userRole: "client",
        emailVerified: true
      }
    }
  ]
};

// Student
let student_dashboard_menu = {
  path: "/student",
  component: DashboardLayout,
  name: "post a job",
  redirect: "/student/dashboard",
  children: [
    {
      path: "create-account",
      name: "create-student-account",
      components: { default: StudentAccount },
      meta: {
        requiresAuth: true,
        userRole: "student"
      }
    },
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
      path: "apply",
      name: "Apply for a Microjob",
      components: { default: ApplyMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "microjobs/active",
      name: "Active Microjobs",
      components: { default: ActiveMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "microjobs/pending",
      name: "Pending Microjobs",
      components: { default: PendingMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "microjobs/complete",
      name: "Complete Microjobs",
      components: { default: CompleteMicrojob },
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "support",
      name: "Get Support",
      component: Support,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "feedback",
      name: "Give Feedback",
      component: Feedback,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    },
    {
      path: "edit-profile",
      name: "Edit Profile",
      component: EditStudentProfile,
      meta: {
        requiresAuth: true,
        userRole: "student",
        emailVerified: true
      }
    }
  ]
};

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
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    {
      path: "/faq",
      name: "Faq",
      component: Faq
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      component: PrivacyPolicy
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      component: TermsAndConditions
    },
    {
      path: "/partner",
      name: "become-a-partner",
      component: Partner
    },
    {
      path: "/lock",
      name: "Lock",
      component: Lock
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
  //Checking to see if route requires auth
  let requiresAuth = to.matched.some(rec => rec.meta.requiresAuth);
  if (requiresAuth) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    // user signed
    if (user) {
      let ref = db.collection("users");
      ref.where("userId", "==", user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let userPermission = doc.data().user;
          // checking to see if user role matches
          let userRoleExist = to.matched.some(rec => rec.meta.userRole == userPermission);
          // user role matches
          if (userRoleExist) {
            // checking to see if user's email has been verified
            let emailVerified = to.matched.some(rec => rec.meta.emailVerified == user.emailVerified);
            // checking to see if user is directing to student account
            let studentAccount = to.matched.some(rec => rec.name == "create-student-account");
            // or client account
            let clientAccount = to.matched.some(rec => rec.name == "create-client-account");
            // email is verified
            if(emailVerified) {
              next();
            } // email not verified but directing to student or client account
            else if(!emailVerified && (clientAccount || studentAccount)) {
              next();
            } // email account has not been verified and not directing to student or client account
            else {
              previous();
            }
          } // user role does not match
          else {
            previous();
          }
        });
      });
    } // no user signed in
    else {
      previous();
    }
  } // does not require authentication
  else {
    next();
  }
});

export default router;

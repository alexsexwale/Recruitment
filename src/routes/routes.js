import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";

// Common Dashboard
import ActiveMicrojob from "@/views/dashboard/view-microjobs/active/ActiveMicrojob.vue";
import PendingMicrojob from "@/views/dashboard/view-microjobs/pending/PendingMicrojob.vue";
import CompleteMicrojob from "@/views/dashboard/view-microjobs/complete/CompleteMicrojob.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";

// Client Dashboard
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import ClientDashbordLayout from "@/views/dashboard/client-dashboard/Layout/DashboardLayout.vue";
import ClientDashboard from "@/views/dashboard/client-dashboard/ClientDashboard.vue";

import PostMicrojob from "@/views/dashboard/client-dashboard/microjobs/post/PostMicrojob.vue";
import EditMicrojob from "@/views/dashboard/client-dashboard/microjobs/edit/EditMicrojob.vue";

// Student Dashboard
import StudentDashbordLayout from "@/views/dashboard/student-dashboard/Layout/DashboardLayout.vue";
import StudentDashboard from "@/views/dashboard/student-dashboard/StudentDashboard.vue";

// Pages
import User from "@/pages/Dashboard/Pages/UserProfile.vue";
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
import StudentForm from "@/views/register/student/StudentForm.vue";
import ClientForm from "@/views/register/client/ClientForm.vue";


// Forms pages
import RegularForms from "@/pages/Dashboard/Forms/RegularForms.vue";
import ExtendedForms from "@/pages/Dashboard/Forms/ExtendedForms.vue";
import ValidationForms from "@/pages/Dashboard/Forms/ValidationForms.vue";
import Wizard from "@/pages/Dashboard/Forms/Wizard.vue";

// TableList pages
import RegularTables from "@/pages/Dashboard/Tables/RegularTables.vue";
import ExtendedTables from "@/pages/Dashboard/Tables/ExtendedTables.vue";
import PaginatedTables from "@/pages/Dashboard/Tables/PaginatedTables.vue";

// Charts
import Widgets from "@/pages/Dashboard/Widgets.vue";

 let formsMenu = {
   path: "/forms",
   component: DashboardLayout,
   redirect: "/forms/regular",
   name: "Forms",
   children: [
     {
       path: "regular",
       name: "Regular Forms",
       components: { default: RegularForms }
     },
     {
       path: "extended",
       name: "Extended Forms",
       components: { default: ExtendedForms }
     },
     {
       path: "validation",
       name: "Validation Forms",
       components: { default: ValidationForms }
     },
     {
       path: "wizard",
       name: "Wizard",
       components: { default: Wizard }
     }
   ]
 };

//Client
let client_microjobs = {
  path: "/client/microjobs",
  component: ClientDashbordLayout,
  name: "microjobs",
  redirect: "/client/microjobs/active",
  children: [
    {
      path: "active",
      name: "active",
      components: { default: ActiveMicrojob }
    },
    {
      path: "pending",
      name: "pending",
      components: { default: PendingMicrojob }
    },
    {
      path: "complete",
      name: "complete",
      components: { default: CompleteMicrojob }
    }
  ]
};
// Client
let client_postJob = {
  path: "/client",
  component: ClientDashbordLayout,
  name: "post a job",
  redirect: "/client/post-a-job",
  children: [
    {
      path: "post-a-job",
      name: "post",
      components: { default: PostMicrojob }
    }
  ]
};

// Client Support
let client_support = {
  path: "/client",
  component: ClientDashbordLayout,
  name: "_support",
  redirect: "/client/support",
  children: [
    {
      path: "support",
      name: "support",
      component: Support
    }
  ]
};

//Client Feedback
let client_feedback = {
  path: "/client",
  component: ClientDashbordLayout,
  name: "_feedback",
  redirect: "/client/feedback",
  children: [
    {
      path: "feedback",
      name: "feedback",
      component: Feedback
    }
  ]
};

//Student
let student_microjobs = {
  path: "/student/microjobs",
  component: StudentDashbordLayout,
  name: "microjobs",
  redirect: "/student/microjobs/active",
  children: [
    {
      path: "active",
      name: "active",
      components: { default: ActiveMicrojob }
    },
    {
      path: "pending",
      name: "pending",
      components: { default: PendingMicrojob }
    },
    {
      path: "complete",
      name: "complete",
      components: { default: CompleteMicrojob }
    }
  ]
};
// Student
let student_postJob = {
  path: "/student",
  component: StudentDashbordLayout,
  name: "post a job",
  redirect: "/student/post-a-job",
  children: [
    {
      path: "post-a-job",
      name: "post",
      components: { default: PostMicrojob }
    }
  ]
};

// Student Support
let student_support = {
  path: "/student",
  component: StudentDashbordLayout,
  name: "_support",
  redirect: "/student/support",
  children: [
    {
      path: "support",
      name: "support",
      component: Support
    }
  ]
};

//Student Feedback
let student_feedback = {
  path: "/student",
  component: StudentDashbordLayout,
  name: "_feedback",
  redirect: "/student/feedback",
  children: [
    {
      path: "feedback",
      name: "feedback",
      component: Feedback
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
      name: "faq",
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
      name: "partner",
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
    },
    {
      path: "/student/register",
      name: "StudentForm",
      components: { default: StudentForm }
    },
    {
      path: "/client/register",
      name: "ClientForm",
      components: { default: ClientForm }
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "client/dashboard",
    name: "Home"
  },
   formsMenu,
  client_postJob,
  client_microjobs,
  client_support,
  client_feedback,
  student_postJob,
  student_microjobs,
  student_support,
  student_feedback,
  authPages,
  {
    path: "/client",
    component: ClientDashbordLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: ClientDashboard }
      },
    ]
  },
  {
    path: "/student",
    component: StudentDashbordLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: StudentDashboard }
      },
    ]
  }
];

export default routes;

// Common Dashboard Components
import ActiveMicrojob from "@/views/dashboard/view-microjobs/active/ActiveMicrojob.vue";
import PendingMicrojob from "@/views/dashboard/view-microjobs/pending/PendingMicrojob.vue";
import CompleteMicrojob from "@/views/dashboard/view-microjobs/complete/CompleteMicrojob.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";

// Client Dashboard Components
import ClientDashbordLayout from "@/views/dashboard/client-dashboard/Layout/DashboardLayout.vue";
import ClientDashboard from "@/views/dashboard/client-dashboard/ClientDashboard.vue";
import EditClientProfile from "@/views/dashboard/client-dashboard/user-profile/EditProfileForm.vue";
import PostMicrojob from "@/views/dashboard/client-dashboard/microjobs/post/PostMicrojob.vue";
import EditMicrojob from '@/views/dashboard/client-dashboard/microjobs/edit/EditMicrojob.vue';


// Student Dashboard Components
import StudentDashbordLayout from "@/views/dashboard/student-dashboard/Layout/DashboardLayout.vue";
import StudentDashboard from "@/views/dashboard/student-dashboard/StudentDashboard.vue";
import EditStudentProfile from "@/views/dashboard/student-dashboard/user-profile/EditProfileForm.vue";

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
import UserRole from "@/views/register/UserRole.vue";


// Form - Register
import Register from "@/views/register/Register.vue";
import StudentForm from "@/views/register/student/StudentForm.vue";
import ClientForm from "@/views/register/client/ClientForm.vue";

// Client Menu
let client_dashboard_menu = {
  path: "/client",
  component: ClientDashbordLayout,
  name: "client nav menu",
  redirect: "/client/dashboard",
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      components: { default: ClientDashboard }
    },
    {
      path: "create-profile",
      name: "Create Profile",
      components: { default: ClientForm }
    },
    {
      path: "microjobs/post",
      name: "Post a Microjob",
      components: { default: PostMicrojob }
    },
    {
      path: "microjobs/edit",
      name: "Edit Microjob",
      components: { default: EditMicrojob }
    },
    {
      path: "microjobs/active",
      name: "Active Microjobs",
      components: { default: ActiveMicrojob }
    },
    {
      path: "microjobs/pending",
      name: "Pending Microjobs",
      components: { default: PendingMicrojob }
    },
    {
      path: "microjobs/complete",
      name: "Complete Microjobs",
      components: { default: CompleteMicrojob }
    },
    {
      path: "support",
      name: "Get Support",
      component: Support
    },
    {
      path: "feedback",
      name: "Give feedback",
      component: Feedback
    },
    {
      path: "edit-profile",
      name: "Edit Profile",
      component: EditClientProfile
    }
  ]
};

// Student
let student_dashboard_menu = {
  path: "/student",
  component: StudentDashbordLayout,
  name: "post a job",
  redirect: "/student/dashboard",
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      components: { default: StudentDashboard }
    },
    {
      path: "create-profile",
      name: "Create Profile",
      components: { default: StudentForm }
    },
    {
      path: "apply",
      name: "Apply for a Microjob",
      components: { default: ApplyMicrojob }
    },
    {
      path: "microjobs/active",
      name: "Active Microjobs",
      components: { default: ActiveMicrojob }
    },
    {
      path: "microjobs/pending",
      name: "Pending Microjobs",
      components: { default: PendingMicrojob }
    },
    {
      path: "microjobs/complete",
      name: "Complete Microjobs",
      components: { default: CompleteMicrojob }
    },
    {
      path: "support",
      name: "Get Support",
      component: Support
    },
    {
      path: "feedback",
      name: "Give Feedback",
      component: Feedback
    },
    {
      path: "edit-profile",
      name: "Edit Profile",
      component: EditStudentProfile
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
      name: "Privacy Policy",
      component: PrivacyPolicy
    },
    {
      path: "/terms-and-conditions",
      name: "Terms And Conditions",
      component: TermsAndConditions
    },
    {
      path: "/partner",
      name: "Become a Partner",
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
      path: "/register/select-user-role",
      name: "UserRole",
      component: UserRole
    },
    {
      path: "/register/student",
      name: "StudentForm",
      components: { default: StudentForm }
    },
    {
      path: "/register/client",
      name: "ClientForm",
      components: { default: ClientForm }
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "login",
    name: "Home"
  },
  client_dashboard_menu,
  student_dashboard_menu,
  authPages
];

export default routes;
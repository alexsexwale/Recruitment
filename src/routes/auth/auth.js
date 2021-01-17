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
import NotFound from "@/views/notFound/NotFound.vue";

export default {
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
      },
      {
        path: "/not-found",
        name: "not-found",
        name: NotFound
      }
    ]
  };
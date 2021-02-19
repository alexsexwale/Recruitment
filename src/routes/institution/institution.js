// Dashboard Components
import DashboardLayout from "@/components/Layout/DashboardLayout.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";

// Institution
import Institution from "@/views/dashboard/institution/Institution.vue";

export default {
  path: "/institution",
  component: DashboardLayout,
  name: "institution-nav-menu",
  redirect: "/institution/reports",
  children: [
    {
      path: "reports",
      name: "institution-reports",
      components: { default: Institution },
      meta: {
        requiresAuth: true,
        userRole: "",
        emailVerified: false
      }
    },
    {
      path: "support",
      name: "get-institution-support",
      component: Support,
      meta: {
        requiresAuth: true,
        userRole: "",
        emailVerified: true
      }
    },
    {
      path: "feedback",
      name: "give-institution-feedback",
      component: Feedback,
      meta: {
        requiresAuth: true,
        userRole: "",
        emailVerified: true
      }
    }
  ]
};

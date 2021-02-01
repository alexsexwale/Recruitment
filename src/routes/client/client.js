// Client and Student Dashboard Components
import DashboardLayout from "@/components/Layout/DashboardLayout.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";
import Settings from "@/views/dashboard/settings/Settings.vue";

// Client Dashboard Components
import ClientDashboard from "@/views/dashboard/client/ClientDashboard.vue";
import ClientProfile from "@/views/dashboard/client/profile/Profile.vue";
import EditClientProfile from "@/views/dashboard/client/profile/EditProfile.vue";

// Post Jobs
import PostMicro from "@/views/dashboard/client/jobs/post/micro/PostJob.vue";
import PostPartTime from "@/views/dashboard/client/jobs/post/part-time/PostJob.vue"; 

// Edit Job
import EditMicro from "@/views/dashboard/client/jobs/edit/micro/EditJob.vue";

// Cancelled Job
import Cancel from "@/views/dashboard/client/jobs/cancel/Cancel.vue";

// Dissatisfied Job
import DissatisfiedJob from "@/views/dashboard/client/jobs/dissatisfied/Dissatisfied.vue";

// Client Job
import PendingJob from "@/views/dashboard/client/jobs/pending/PendingJob.vue";
import ActiveJob from "@/views/dashboard/client/jobs/active/ActiveJob.vue";
import CompleteJob from "@/views/dashboard/client/jobs/complete/CompleteJob.vue";
import IncompleteJob from "@/views/dashboard/client/jobs/incomplete/IncompleteJob";

// Job Statuses
import MicroStatus from "@/views/dashboard/client/jobs/status/micro/Status.vue";

import StudentProfile from "@/views/dashboard/student/profile/Profile.vue";

import PaymentSuccess from "@/views/dashboard/client/jobs/payment/success/Success.vue";

import PaymentFail from "@/views/dashboard/client/jobs/payment/fail/Fail.vue";

export default {
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
        path: "payment/success/:id",
        name: "payment-success",
        components: { default: PaymentSuccess},
        meta: {
          requiresAuth: true,
          userRole: "client",
          emailVerified: true,
        }
      },
      {
        path: "payment/fail/:id",
        name: "payment-failed",
        components: { default: PaymentFail},
        meta: {
          requiresAuth: true,
          userRole: "client",
          emailVerified: true,
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
        path: "jobs/part-time/post",
        name: "post-a-part-time-job",
        components: { default: PostPartTime},
        meta: {
          requiresAuth: true,
          userRole: "client",
          emailVerified: true,
          jobType: "part-time"
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
        components: { default: CompleteJob },
        meta: {
          requiresAuth: true,
          userRole: "client",
          emailVerified: true
        }
      },
      {
        path: "jobs/incomplete",
        name: "incomplete-jobs",
        components: { default: IncompleteJob },
        meta: {
          requiresAuth: true,
          userRole: "client",
          emailVerified: true
        }
      },
      {
        path: "jobs/dissatisfied",
        name: "dissatisfied-jobs",
        component: DissatisfiedJob,
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
        path: "settings",
        name: "settings",
        component: Settings,
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
          emailVerified: true,
          client: true
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
        component: Cancel,
        meta: {
          requiresAuth: true,
          userRole: "client",
          emailVerified: true
        }
      }
    ]
  };
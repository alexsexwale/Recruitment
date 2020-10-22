// Client and Student Dashboard Components
import DashboardLayout from "@/components/Layout/DashboardLayout.vue";
import Support from "@/views/dashboard/support/Support.vue";
import Feedback from "@/views/dashboard/feedback/Feedback.vue";

import StudentDashboard from "@/views/dashboard/student/StudentDashboard.vue";
import StudentProfile from "@/views/dashboard/student/profile/Profile.vue";
import ClientProfile from "@/views/dashboard/client/profile/Profile.vue";
import EditStudentProfile from "@/views/dashboard/student/profile/EditProfile.vue";

import Jobs from "@/views/dashboard/student/jobs/Jobs.vue";
import MicroApplication from "@/views/dashboard/student/jobs/application/micro/Application.vue";

// Dissatisfied Job
import DissatisfiedJob from "@/views/dashboard/student/jobs/dissatisfied/Dissatisfied.vue";

// Student Job
import Applied from "@/views/dashboard/student/jobs/applied/Applied.vue";
import ActiveJob from "@/views/dashboard/student/jobs/active/Active.vue";
import CompleteJob from "@/views/dashboard/student/jobs/complete/Complete.vue";
import IncompleteJob from "@/views/dashboard/student/jobs/incomplete/IncompleteJob.vue";

import StudentStatus from "@/views/dashboard/student/jobs/status/micro/Status.vue";
export default {
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
        components: { default: ActiveJob },
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
        components: { default: CompleteJob },
        meta: {
          requiresAuth: true,
          userRole: "student",
          emailVerified: true
        }
      },
      {
        path: "jobs/incomplete",
        name: "incomplete-student-jobs",
        components: { default: IncompleteJob },
        meta: {
          requiresAuth: true,
          userRole: "student",
          emailVerified: true
        }
      },
      {
        path: "jobs/dissatisfied",
        name: "dissatisfied-student-jobs",
        component: DissatisfiedJob,
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
    //   {
    //     path: "/faq",
    //     name: "student-faq",
    //     component: Faq,
    //     meta: {
    //       requiresAuth: true,
    //       userRole: "student",
    //       emailVerified: true
    //     }
    //   },
    //   {
    //     path: "/privacy-policy",
    //     name: "student-privacy-policy",
    //     component: PrivacyPolicy,
    //     meta: {
    //       requiresAuth: true,
    //       userRole: "student",
    //       emailVerified: true
    //     }
    //   },
    //   {
    //     path: "/terms-and-conditions",
    //     name: "student-terms-and-conditions",
    //     component: TermsAndConditions,
    //     meta: {
    //       requiresAuth: true,
    //       userRole: "student",
    //       emailVerified: true
    //     }
    //   }
    ]
  };
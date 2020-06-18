import AuthLayout from "@/views/AuthLayout.vue";
import StudentAccount from "@/views/register/student/StudentAccount.vue";

export default {
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
import ClientAccount from "@/views/register/client/ClientAccount.vue";
import AuthLayout from "@/views/AuthLayout.vue";

export default {
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
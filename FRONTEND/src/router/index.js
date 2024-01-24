import { authGuard } from "@/guard/authGuard";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
      beforeEnter: authGuard,
    },
  ],
});

export default router;

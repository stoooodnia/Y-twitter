import { authGuard } from "@/guard/authGuard.js";
import { healthGuard } from "@/guard/healthGuard";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: healthGuard,
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/wall",
      name: "wall",
      component: () => import("../views/WallView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: healthGuard,
    },
    {
      path: "/profile/:userId",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: () => import("../views/EditProfileView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: () => import("../views/NotificationsView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/NotFoundView.vue"),
      beforeEnter: healthGuard,
    },
    {
      path: "/connection-error",
      name: "connectionError",
      component: () => import("../views/ConnectionErrorView.vue"),
    },
  ],
});

export default router;

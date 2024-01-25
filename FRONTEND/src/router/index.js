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
    },
    {
      path: "/profile/:userId",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("../views/PostsView.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/editProfile",
      name: "editProfile",
      component: () => import("../views/EditProfileView.vue"),
      beforeEnter: authGuard,
    },
  ],
});

export default router;

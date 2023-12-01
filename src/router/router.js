import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/CategoriesView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/HistoryView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/planning",
    name: "planning",
    component: () => import("../views/PlanningView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/record",
    name: "record",
    component: () => import("../views/RecordView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      layout: "empty",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      layout: "empty",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requireAuth = to.meta.auth;

  if (requireAuth && authStore.getIsAuth()) {
    next();
  } else if (requireAuth && !authStore.getIsAuth()) {
    next("/login?warning=unauthorized");
  } else {
    next();
  }
})
export default router;

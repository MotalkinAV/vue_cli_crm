import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth.store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/CategoriesView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("../views/DetailView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/history",
    name: "History",
    component: () => import("../views/HistoryView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/planning",
    name: "Planning",
    component: () => import("../views/PlanningView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/record",
    name: "Record",
    component: () => import("../views/RecordView.vue"),
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      layout: "empty",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
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

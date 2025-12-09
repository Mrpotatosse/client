import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import ProfileView from "@/pages/ProfileView.vue";
import AboutView from "@/pages/AboutView.vue";
import ReferencesView from "@/pages/ReferencesView.vue";
import {useAuthStore} from "@/stores/auth.store.ts";
import ErrorView from "@/pages/ErrorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomeView
    },
    {
      name: "profile",
      path: "/profile",
      component: ProfileView, // todo: dynamic import
      meta: {requiresAuth: true}
    },
    {
      name: "about",
      path: "/about",
      component: AboutView
    },
    {
      name: "references",
      path: "/references",
      component: ReferencesView, // todo: dynamic import
      meta: {requiresAuth: true, requiredRole: "reference-manager"},
      children: [
        {
          name: "references-select",
          path: ":name",
          component: ReferencesView, // todo: dynamic import
          meta: {requiresAuth: true, requiredRole: "reference-manager"}
        }
      ]
    },
    {
      name: "error",
      path: "/error",
      component: ErrorView
    }
  ],
});

router.addRoute({
  path: "/:pathMatch(.*)*",
  redirect: {name: "error"}
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  const requiresAuth = to.meta.requiresAuth === true;
  const requiredRole = to.meta.requiredRole as string | undefined;

  // 1. User must be authenticated
  if (requiresAuth && !auth.isAuthenticated) {
    return next({name: "error"}); // or login page, or forbidden page
  }

  // 2. If a role is required, user must have it
  if (requiredRole && !auth.hasRole(requiredRole)) {
    return next({name: "error"}); // or a "forbidden" page
  }

  // Pass through when no conditions block it
  next();
});

export default router;


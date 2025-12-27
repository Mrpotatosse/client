import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import ProfileView from "@/pages/ProfileView.vue";
import AboutView from "@/pages/AboutView.vue";
import ReferencesView from "@/pages/ReferencesView.vue";
import ErrorView from "@/pages/ErrorView.vue";
import CallbackView from "@/pages/auth/CallbackView.vue";

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
      name: "callback",
      path: "/auth/callback",
      component: CallbackView
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

export default router;


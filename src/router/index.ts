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
      meta: {requiresAuth: true},
      children: [
        {
          name: "references-select",
          path: ":name",
          component: ReferencesView, // todo: dynamic import
          meta: {requiresAuth: true}
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
  const {isAuthenticated} = useAuthStore();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({name: "error"});
  } else {
    next();
  }
});

export default router;


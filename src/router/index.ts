import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import ProfileView from "@/pages/ProfileView.vue";
import AboutView from "@/pages/AboutView.vue";

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
      component: ProfileView
    },
    {
      name: "about",
      path: "/about",
      component: AboutView
    }
  ],
});

export default router;


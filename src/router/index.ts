import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/pages/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomeView
    }
  ],
});

export default router;


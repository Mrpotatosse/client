import {useAuthStore} from "@/stores/auth.store.ts";
import {storeToRefs} from "pinia";
import router from "@/router";

export default function () {
  router.beforeEach(async (to, _, next) => {
    const auth = useAuthStore();
    const {isAuthenticated} = storeToRefs(auth);

    const requiresAuth = to.meta.requiresAuth === true;
    const requiredRole = to.meta.requiredRole as string | undefined;

    // 1. User must be authenticated
    if (requiresAuth && !isAuthenticated.value) {
      return next({name: "error"}); // or login page, or forbidden page
    }

    // 2. If a role is required, user must have it
    if (requiredRole && !auth.hasRole(requiredRole)) {
      return next({name: "error"}); // or a "forbidden" page
    }

    // Pass through when no conditions block it
    next();
  });
}

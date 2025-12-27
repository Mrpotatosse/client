import ky from "ky";
import {useAuthStore} from "@/stores/auth.store.ts";
import {storeToRefs} from "pinia";

export const api = ky.extend({
  prefixUrl: import.meta.env.VITE_SERVER_PREFIX_URL,
  hooks: {
    beforeRequest: [async (request) => {
      const auth = useAuthStore();
      const {isAuthenticated} = storeToRefs(auth);
      if (isAuthenticated.value && auth.user?.access_token)
        request.headers.set("Authorization", `Bearer ${auth.user.access_token}`);
    }]
  }
});

import ky from "ky";
import {useAuthStore} from "@/stores/auth.store.ts";

export const api = ky.extend({
  prefixUrl: import.meta.env.VITE_SERVER_PREFIX_URL,
  hooks: {
    beforeRequest: [(request) => {
      const {token} = useAuthStore();
      if (token) request.headers.set("Authorization", `Bearer ${token}`);
    }]
  }
});

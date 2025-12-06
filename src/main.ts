import {createApp} from "vue";
import {createPinia} from "pinia";

import App from "@/App.vue";
import router from "@/router";
import {useAuthStore} from "@/stores/auth.store.ts";
import primeVue from "primevue/config";
import toastService from "primevue/toastservice";
import preset from "@primeuix/themes/material";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(primeVue, {theme: {preset}});
app.use(toastService);

const auth = useAuthStore();

auth
  .init()
  .then(() => app.mount("#app"));


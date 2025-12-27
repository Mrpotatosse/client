import {createApp} from "vue";
import {createPinia} from "pinia";
import "@/assets/css/app.css";
import App from "@/App.vue";
import router from "@/router";
import primeVue from "primevue/config";
import toastService from "primevue/toastservice";
import styleClass from "primevue/styleclass";
import confirmationService from "primevue/confirmationservice";
import i18n from "@/i18n";
import roleRequired from "@/directives/role.required.directive.ts";
import autoFocus from "@/directives/autofocus.directive.ts";
import autoScroll from "@/directives/autoscroll.directive.ts";
import {basePreset} from "@/themes/base.theme.ts";
import {useAuthStore} from "@/stores/auth.store.ts";
import defineUserGuard from "@/router/guard/user.guard.ts";
import {defineAllRules} from "@/validators";


const app = createApp(App);
const pinia = createPinia();

app.use(i18n);
app.use(pinia);

app.use(primeVue, {theme: {preset: basePreset}});
app.use(toastService);
app.use(confirmationService);
app.directive("role-required", roleRequired);
app.directive("style-class", styleClass);
app.directive("auto-focus", autoFocus);
app.directive("auto-scroll", autoScroll);

const auth = useAuthStore();

auth
  .bootstrap()
  .then(defineUserGuard)
  .then(defineAllRules)
  .then(() => app.use(router))
  .then(() => app.mount("#app"));

<template>
  <Toolbar>
    <template #start>
      <div class="flex gap-2">
        <Button ref="homeButton"
                :text="!isSelected('home')"
                icon="pi pi-home"
                severity="primary"
                @click="router.push({name: 'home'})"/>
        <RouterLink v-for="(item, index) in props.items"
                    :key="index"
                    v-role-required="item.role"
                    :to="item.route">
          <Button :label="item.label"
                  :text="!isSelected( (typeof item.route === 'object' && 'name' in item.route) ?
                  item.route.name as string :
                  item.route as string)"
                  severity="primary"/>
        </RouterLink>
      </div>
    </template>

    <template #end>
      <Button icon="pi pi-ellipsis-v"
              severity="secondary"
              text
              @click="toggle"></Button>
      <Menu id="navbar-menu" ref="menu" :model="menuItems" popup/>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import type {MenuItem} from "primevue/menuitem";
import {useAuthStore} from "@/stores/auth.store.ts";
import {Menu, type MenuMethods} from "primevue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import type {NavbarItem} from "@/components/navbar/types.ts";
import {storeToRefs} from "pinia";

const auth = useAuthStore();
const {isAuthenticated} = storeToRefs(auth);
const router = useRouter();
const {t} = useI18n();

const props = defineProps<{
  items: NavbarItem[]
}>();
const homeButton = ref<HTMLButtonElement>();
const menu = ref<MenuMethods>();
const menuItems = computed<MenuItem[]>(() => {
  if (isAuthenticated.value) {
    return [
      {
        label: t("app.about"),
        icon: "pi pi-info-circle",
        command: async () => await router.push({name: "about"})
      },
      {
        label: t("app.profile"),
        icon: "pi pi-user",
        command: async () => await router.push({name: "profile"})
      },
      {
        label: t("app.disconnect"),
        icon: "pi pi-sign-out",
        command: auth.logout
      }
    ];
  }

  return [
    {
      label: t("app.about"),
      icon: "pi pi-info-circle",
      command: async () => await router.push({name: "about"})
    },
    {
      label: t("app.connect"),
      icon: "pi pi-sign-in",
      command: auth.login
    }
  ];
});

const toggle = (event: PointerEvent) => {
  menu.value?.toggle(event);
};

const isSelected = (routeName: string) => {
  const route = router.currentRoute.value;
  if (!route) return false;
  if (route.name === routeName) return true;
  return route.matched.some(r => r.name === routeName);
};
</script>

<style scoped>
</style>

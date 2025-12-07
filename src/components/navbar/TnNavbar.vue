<template>
  <Toolbar>
    <template #start>
      <div class="flex gap-2">
        <Button :text="!isSelected('home')"
                icon="pi pi-home"
                severity="primary"
                @click="router.push({name: 'home'})"/>
        <RouterLink v-for="(item, index) in props.items"
                    :key="index"
                    v-role-required="item.role"
                    :to="{name: item.route}">
          <Button :label="item.label"
                  :text="!isSelected(item.route)"
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

const {isAuthenticated, login, logout} = useAuthStore();
const router = useRouter();
const {t} = useI18n();

const props = defineProps<{
  items: NavbarItem[]
}>();
const menu = ref<MenuMethods>();

const menuItems = computed<MenuItem[]>(() => {
  const list: MenuItem[] = [{
    label: t("app.about"),
    icon: "pi pi-info-circle",
    command: () => router.push({name: "about"})
  }];

  if (isAuthenticated.value) {
    list.push({
      label: t("app.profile"),
      icon: "pi pi-user",
      command: () => router.push({name: "profile"})
    }, {
      label: t("app.disconnect"),
      icon: "pi pi-sign-out",
      command: logout
    });
  } else {
    list.push({
      label: t("app.connect"),
      icon: "pi pi-sign-in",
      command: login
    });
  }
  return list;
});

const toggle = (event: PointerEvent) => {
  menu.value?.toggle(event);
};

const isSelected = (routeName: string) => {
  const route = router.currentRoute.value;
  if (!route) return false;

  // current route name
  if (route.name === routeName) return true;

  // any matched child route names
  return route.matched.some(r => r.name === routeName);
};
</script>

<style scoped>
</style>

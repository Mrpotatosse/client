<template>
  <Toolbar>
    <template #start>
      <div class="flex gap-2">
        <Button icon="pi pi-home"
                severity="secondary"
                text
                @click="router.push({name: 'home'})"/>
        <Button icon="pi pi-print" severity="secondary" text/>
        <Button icon="pi pi-upload" severity="secondary" text/>
      </div>
    </template>

    <template #end>
      <Button icon="pi pi-ellipsis-v"
              severity="secondary"
              text
              @click="toggle"></Button>
      <Menu id="navbar-menu" ref="menu" :model="items" popup/>
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

const {isAuthenticated, login, logout} = useAuthStore();
const router = useRouter();
const {t} = useI18n();

const menu = ref<MenuMethods>();

const items = computed<MenuItem[]>(() => {
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
</script>

<style scoped>
</style>

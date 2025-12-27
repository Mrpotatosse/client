<template>
  <header>
    <TnNavbar :items="navbarItems"/>
  </header>
  <main>
    <RouterView/>
  </main>
  <Toast/>
  <DynamicDialog/>
  <ConfirmDialog/>
</template>

<script lang="ts" setup>
import TnNavbar from "@/components/navbar/TnNavbar.vue";
import {DynamicDialog, Toast, useToast} from "primevue";
import {navbarItems} from "@/globals/navbar.global.ts";
import {useAuthStore} from "@/stores/auth.store.ts";
import {onBeforeMount} from "vue";
import {useRouter} from "vue-router";

const {bindOidcEvents} = useAuthStore();
const toast = useToast();
const router = useRouter();

const redirectHome = async () => {
  await router.push({name: "home"});
};

onBeforeMount(() => bindOidcEvents(toast, {
  onTokenExpired: redirectHome,
  onUserUnload: redirectHome
}));
</script>

<style scoped></style>

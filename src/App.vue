<template>
  <header>
    <TnNavbar :items="navbarItems"/>
  </header>
  <main>
    <RouterView/>
  </main>
  <Toast/>
</template>

<script lang="ts" setup>
import TnNavbar from "@/components/navbar/TnNavbar.vue";
import {useAuthStore} from "@/stores/auth.store.ts";
import {onBeforeMount} from "vue";
import {navbarItems} from "@/globals/navbar.global.ts";

const {init} = useAuthStore();

onBeforeMount(init);
</script>

<style scoped></style>

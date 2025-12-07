<template>
  <header>
    <TnNavbar/>
  </header>
  <RouterView/>
  <Toast/>
</template>

<script lang="ts" setup>
import TnNavbar from "@/components/TnNavbar.vue";
import {useAuthStore} from "@/stores/auth.store.ts";
import {onBeforeMount} from "vue";

const {init} = useAuthStore();

onBeforeMount(init);
</script>

<style scoped></style>

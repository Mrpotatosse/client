<template>
  <header>
    <TnNavbar/>
  </header>
  <RouterView/>
  <Toast/>
</template>

<script lang="ts" setup>
import TnNavbar from "@/components/TnNavbar.vue";
</script>

<style scoped></style>

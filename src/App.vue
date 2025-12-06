<template>
  <header>
    <BaseMenubar/>
  </header>
  <RouterView/>
  <Toast/>
</template>

<script lang="ts" setup>
import BaseMenubar from "@/components/BaseMenubar.vue";
</script>

<style scoped></style>

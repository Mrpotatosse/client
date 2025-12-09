<template>
  <header>
    <TnNavbar :items="navbarItems"/>
  </header>
  <main>
    <RouterView/>
  </main>
  <Toast/>
  <DynamicDialog/>
</template>

<script lang="ts" setup>
import TnNavbar from "@/components/navbar/TnNavbar.vue";
import {navbarItems} from "@/globals/navbar.global.ts";
</script>

<style scoped></style>

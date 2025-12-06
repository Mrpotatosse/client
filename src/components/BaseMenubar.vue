<template>
  <Menubar :model="items">
    <template #end>
      <div class="flex items-center gap-2">
        <Button v-if="!isAuthenticated" @click="login">connect</Button>
        <Button v-else @click="logout">disconnect</Button>
      </div>
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import type {MenuItem} from "primevue/menuitem";
import {useAuthStore} from "@/stores/auth.store.ts";

const {isAuthenticated, login, logout} = useAuthStore();

const items = ref<MenuItem[]>([
  {label: "this is a test"}
]);
</script>

<style scoped>

</style>

<template>
  <div>{{ t("app.redirect") }}</div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth.store.ts";

const router = useRouter();
const auth = useAuthStore();
const {t} = useI18n();

onMounted(async () => {
  await auth.init();
  await router.push({name: "home"});
});
</script>

<style scoped>

</style>

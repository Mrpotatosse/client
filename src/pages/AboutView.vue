<template>
  <div>{{ t("app.about.title") }}</div>
  <RouterLink to="/references/test">go</RouterLink>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();
</script>

<style scoped>

</style>

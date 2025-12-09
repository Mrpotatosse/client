<template>
  <div>
    {{ t("app.reference.error", props.modelValue) }}
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import type {ServiceError} from "@/services/types.ts";

const {t} = useI18n();

const props = defineProps<{ modelValue: ServiceError }>();
</script>

<style scoped>

</style>

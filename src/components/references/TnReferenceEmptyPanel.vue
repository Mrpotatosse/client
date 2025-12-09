<template>
  <div>
    {{ t("app.reference.noContent", props.modelValue) }}
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import type {NoContent} from "@/components/references/types.ts";

const {t} = useI18n();

const props = defineProps<{ modelValue?: NoContent }>();
</script>

<style scoped>

</style>

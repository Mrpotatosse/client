<template>
  <DataTable :pt="{
              tableContainer: 'overflow-auto h-full flex-1',
              table: 'relative',
              thead: 'sticky top-0'
             }"
             :value="props.modelValue.content">
    <template #empty>
      {{ t(`app.${props.referenceName}.empty`) }}
    </template>
    <Column v-for="col in getColumns()" :key="col" :field="col" :header="getHeader(col)"/>
  </DataTable>
</template>

<script generic="T" lang="ts" setup>
import {useI18n} from "vue-i18n";
import type {Page} from "@/components/references/types.ts";

const {t} = useI18n();

const props = defineProps<{ modelValue: Page<T>, referenceName: string }>();
const getColumns = () => {
  const zero = props.modelValue.content[0];
  if (zero) return Object.keys(zero);
  return [];
};
const getHeader = (column: string) => {
  return t(`app.${props.referenceName}.${column}`);
};
</script>

<style scoped>

</style>

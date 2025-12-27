<template>
  <template v-for="(value, index) in props.properties" :key="index">
    <div v-if="value
    && props.nameKey in value
    && props.typeKey in value" class="w-full flex flex-col">
      <template v-if="isString(value[props.typeKey as never])">
        <slot :data="{value}" name="string"/>
      </template>
      <template v-else-if="isNumber(value[props.typeKey as never])">
        <slot :data="{value}" name="number"/>
      </template>
      <template v-else-if="isBoolean(value[props.typeKey as never])">
        <slot :data="{value}" name="boolean"/>
      </template>
      <template v-else-if="isList(value[props.typeKey as never])">
        <slot :data="{value, type: extractList(value[props.typeKey as never])}" name="list"/>
      </template>
      <template v-else-if="isMap(value[props.typeKey as never])">
        <slot :data="{value}" name="map"/>
      </template>
      <template v-else>
        <slot :data="{value}" name="object"/>
      </template>
    </div>
  </template>
</template>

<script generic="T extends object" lang="ts" setup>
import {
  extractList,
  isBoolean,
  isList,
  isMap,
  isNumber,
  isString
} from "@/components/forms/utils.ts";

const props = defineProps<{
  properties: T[],
  nameKey: string,
  typeKey: string
}>();
</script>

<style scoped>

</style>

<template>
  <div class="full flex gap-2">
    <Listbox v-model="selectedReference"
             :options="referencesItems"
             :pt="{
               listContainer: '!max-h-full'
             }"
             checkmark
             class="basis-1/4 shrink-0 h-full overflow-auto"
             option-label="label"
             @update:model-value="update"/>
    <Panel class="flex-1 h-full">
      Test
    </Panel>
  </div>
</template>

<script lang="ts" setup>
import {type ReferenceItem, referencesItems} from "@/globals/references.global.ts";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter();
const route = useRoute();

const selectedReference = ref<ReferenceItem | undefined>(referencesItems
  .find(r => r.value === route.params.name));

const update = async (item?: ReferenceItem) => {
  if (item)
    await router.push({name: "references-select", params: {name: item.value}});
  else
    await router.push({name: "references"});
};
</script>

<style scoped>

</style>

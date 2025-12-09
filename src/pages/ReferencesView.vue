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
    <TnReferencePanel v-model="selectedReference"
                      class="flex-1 h-full">
      {{ selectedReference?.value }}
    </TnReferencePanel>
  </div>
</template>

<script lang="ts" setup>
import {type ReferenceItem, referencesItems} from "@/globals/references.global.ts";
import {useRouter} from "vue-router";
import {computed} from "vue";
import TnReferencePanel from "@/components/references/TnReferencePanel.vue";

const router = useRouter();

const selectedReference = computed<ReferenceItem | undefined>(() => referencesItems
  .find(r => r.value === router.currentRoute.value.params.name));

const update = async (item?: ReferenceItem) => {
  if (item)
    await router.push({name: "references-select", params: {name: item.value}});
  else
    await router.push({name: "references"});
};
</script>

<style scoped>

</style>

<template>
  <TnReferenceLoadingPanel v-if="referencesLoading"
                           class="basis-1/4 shrink-0 h-full overflow-auto"/>
  <Listbox v-else
           :model-value="selectedReference"
           :options="options"
           :pt="{
             listContainer: '!max-h-full'
           }"
           checkmark
           class="basis-1/4 shrink-0 h-full overflow-auto"
           option-label="label"
           @update:model-value="update">
    <template #empty>
      {{ t("app.references.empty") }}
    </template>
    <template #option="{option}">
      <div class="flex justify-between items-center w-full">
        <div>{{ option.label }}</div>
      </div>
    </template>
  </Listbox>
  <div class="flex-1">
    <div class="full !max-h-full !max-w-full">
      <slot :data="selectedReference" name="default"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {computed, onBeforeMount, ref} from "vue";
import {coreReferenceService} from "@/services/core.service.ts";
import {useToast} from "primevue";
import {loadingContent, noContent} from "@/components/references/const.ts";
import type {CoreReferenceService} from "@/services/core.service.types.ts";
import {useSmartFetch} from "@/composables/useSmartFetch.ts";
import type {
  ReferenceItem,
  ReferenceResult,
  SmartFetchParams
} from "@/components/references/types.ts";
import {useI18n} from "vue-i18n";
import TnReferenceLoadingPanel from "@/components/references/TnReferenceLoadingPanel.vue";

const toast = useToast();
const router = useRouter();
const {t} = useI18n();
const refService = ref<CoreReferenceService>(coreReferenceService(toast, true));

const getService = (disableOnSuccess: boolean = true) => {
  refService.value = coreReferenceService(toast, disableOnSuccess);
};

const getReferences = async (params: SmartFetchParams) => {
  getService();
  if (!refService.value) return noContent;
  return await refService.value.discover(params);
};

const update = async (item?: ReferenceItem) => {
  if (item)
    await router.push({
      name: "references-select", params: {name: item.value}, query: {
        page: 0,
        size: 20
      }
    });
  else
    await router.push({name: "references"});
};

const {
  result: referencesContent,
  loading: referencesLoading,
  execute: referencesExecute
} = useSmartFetch<ReferenceResult<string[]>>(getReferences, loadingContent);

const reloadAll = async () => {
  await referencesExecute({});
};

const options = computed(() => Array.isArray(referencesContent.value) ?
  referencesContent.value.map(r => ({
    label: t(`app.references.${r}`),
    value: r
  } satisfies ReferenceItem)) : []);

const selectedReference = computed<ReferenceItem | undefined>(() => options
  .value
  .find(r => r.value === router.currentRoute.value.params.name));

onBeforeMount(reloadAll);
</script>

<style scoped>

</style>

<template>
  <Panel :pt="{
    header: 'relative',
    root: '!flex flex-col relative',
    contentContainer: 'overflow-auto h-full flex-1',
    contentWrapper: 'full',
    content: 'full'
  }">
    <template #header>
      <div class="sticky top-0 flex-between w-full">
        <div>{{ props.modelValue?.label ?? t("app.references.select") }}</div>
        <div v-if="isValid">
          <Button :label="t(`app.${props.modelValue?.value}.add`)"
                  icon="pi pi-plus"
                  severity="secondary"
                  @click="dialog = true"/>
        </div>
      </div>
    </template>
    <div v-if="loading || ('abort' in page && props.modelValue)">{{ t("app.loading") }}</div>
    <template v-else-if="page">
      <TnReferenceEmptyPanel v-if="'noContent' in page"
                             v-model="page"
                             class="full"/>
      <TnReferenceEmptyPanel v-else-if="'abort' in page"
                             class="full"/>
      <TnReferenceEmptyPanel v-else-if="!props.modelValue"
                             class="full"/>
      <TnReferenceErrorPanel v-else-if="'error' in page"
                             v-model="page"
                             class="full"/>
      <TnReferencePagePanel v-else
                            v-model="page"
                            :reference-name="props.modelValue?.value ?? ''"
                            class="full"/>
    </template>
    <TnModal v-model="dialog">
      <template #header>
        {{ t(`app.${props.modelValue?.value}.creation`) }}
      </template>
      <TnReferenceForm/>
    </TnModal>
  </Panel>
</template>

<script lang="ts" setup>
import type {ReferenceItem} from "@/globals/references.global.ts";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import {referenceService} from "@/services/reference.service.ts";
import {useToast} from "primevue";
import {computed, onBeforeMount, ref, watch} from "vue";
import {noContent} from "@/components/references/const.ts";
import TnReferenceErrorPanel from "@/components/references/TnReferenceErrorPanel.vue";
import TnReferenceEmptyPanel from "@/components/references/TnReferenceEmptyPanel.vue";
import TnReferencePagePanel from "@/components/references/TnReferencePagePanel.vue";
import {useSmartFetch} from "@/composables/useSmartFetch.ts";
import TnReferenceForm from "@/components/references/TnReferenceForm.vue";
import TnModal from "@/components/modal/TnModal.vue";

const props = defineProps<{
  modelValue?: ReferenceItem
}>();

const {t} = useI18n();

const route = useRoute();
const toast = useToast();
const service = ref(referenceService<object>(props.modelValue?.value ?? "", toast, true));
const dialog = ref(false);

const isValid = computed(() =>
  !loading.value &&
  !("error" in page.value) &&
  !("abort" in page.value) &&
  !("noContent" in page.value));

const getService = () => {
  if (props.modelValue)
    service.value = referenceService<object>(props.modelValue?.value ?? "", toast, true);
};

const getPage = async (signal?: AbortSignal) => {
  getService();
  if (!props.modelValue || !service.value) return noContent;
  return await service.value.getAll(route.query, {signal});
};

const {loading, result: page, execute} = useSmartFetch(getPage, noContent);

onBeforeMount(execute);

watch(() => props.modelValue, execute);
watch(() => route.query.page, execute);
watch(() => route.query.size, execute);
</script>

<style scoped>

</style>

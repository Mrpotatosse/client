<template>
  <Panel :pt="{
    root: '!flex flex-col full relative',
    contentContainer: 'flex-1',
    contentWrapper: 'full ',
    content: '!max-h-full !h-full'
  }">
    <template #header>
      <div class="sticky top-0 flex-between w-full">
        <div id="reference-title-id">
        </div>
        <div id="reference-paginator-id"
             class="flex-centered absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
        <div id="reference-create-id" class="flex-centered gap-2"/>
      </div>
    </template>
    <TnReferenceNoContentPanel v-if="!props.modelValue" class="full"/>
    <template v-else-if="columnsContent && pageContent">
      <TnReferenceNoContentPanel v-if="isNo(pageContent) && !props.modelValue"
                                 class="full"/>
      <TnReferenceErrorPanel v-else-if="isError(pageContent)"
                             class="full"/>
      <TnReferencePagePanel v-else
                            :columns="columnsContent"
                            :delete-fn="submitDelete"
                            :loading="pageNotSuccess"
                            :model-value="isNo(pageContent) ||
                             isError(pageContent) ||
                            isAbort(pageContent) ||
                            isLoading(pageContent)
                            ? undefined : pageContent"
                            :reference-name="props.modelValue.value"
                            create-id="#reference-create-id"
                            identifier="id"
                            pagination-id="#reference-paginator-id"
                            title-id="#reference-title-id"
                            @edit="enableModification"
      >
        <Inplace :active="isSearch"
                 unstyled
                 @update:active="setIsSearch">
          <template #display>
            <div class="flex gap-2" @click.stop>
              <Button :label="t(`app.references.${props.modelValue?.value}.create`)"
                      icon="pi pi-plus"
                      @click.stop="createDialog = true"/>
              <Button icon="pi pi-search" outlined @click="setIsSearch(true)"/>
            </div>
          </template>
          <template #content="{ closeCallback }">
            <span class="inline-flex items-center gap-2">
                <Button icon="pi pi-plus"
                        @click.stop="createDialog = true"/>
                <InputText :value="searchValue" autofocus @update:model-value="setSearchValue"/>
                <Button icon="pi pi-times" outlined @click="closeCallback"/>
            </span>
          </template>
        </Inplace>
        <template #title="{data}">
          <p>{{ props.modelValue?.label ?? t("app.references.select") }}</p>
          <p v-if="pageNotSuccess">
            {{
              t("app.references.loading_elements")
            }}
          </p>
          <p v-else>
            {{
              t("app.references.total_elements", {total: data.page.totalElements})
            }}
          </p>
        </template>
      </TnReferencePagePanel>
    </template>

    <TnModal v-model="createDialog">
      <template #header>
        {{ t(`app.references.${props.modelValue?.value}.create.title`) }}
      </template>
      <TnReferenceLoadingPanel v-if="creationLoading || isLoading(creationContent)"
                               class="!min-w-lg p-6"/>
      <template v-else-if="creationContent">
        <TnReferenceNoContentPanel v-if="isNo(creationContent)"
                                   class="!min-w-lg"/>
        <TnReferenceNoContentPanel v-else-if="isAbort(creationContent)"
                                   class="!min-w-lg"/>
        <TnReferenceErrorPanel v-else-if="isError(creationContent)"
                               class="!min-w-lg"/>
        <TnForm v-else
                :loading="createLoading"
                :name="props.modelValue?.value"
                :properties="creationContent"
                :values="!defaultLoading && isValid(defaultContent) ? defaultContent : undefined"
                @cancel="createDialog = false"
                @submit="submitCreation"/>
      </template>
    </TnModal>

    <TnModal v-model="modifyDialog">
      <template #header>
        {{ t(`app.references.${props.modelValue?.value}.modify.title`) }}
      </template>
      <TnReferenceLoadingPanel v-if="modificationLoading || isLoading(modificationContent)"
                               class="!min-w-lg p-6"/>
      <template v-else-if="modificationContent">
        <TnReferenceNoContentPanel v-if="isNo(modificationContent)"
                                   class="!min-w-lg"/>
        <TnReferenceNoContentPanel v-else-if="isAbort(modificationContent)"
                                   class="!min-w-lg"/>
        <TnReferenceErrorPanel v-else-if="isError(modificationContent)"
                               class="!min-w-lg"/>
        <TnForm v-else
                :loading="modifyLoading"
                :name="props.modelValue?.value"
                :properties="modificationContent"
                :values="modifyData"
                @cancel="modifyDialog = false"
                @submit="submitModification"/>
      </template>
    </TnModal>
  </Panel>
</template>

<script generic="T extends never" lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {referenceService} from "@/services/reference.service.ts";
import {useToast} from "primevue";
import {computed, onBeforeMount, ref, watch} from "vue";
import {loadingContent, noContent} from "@/components/references/const.ts";
import TnReferenceErrorPanel from "@/components/references/TnReferenceErrorPanel.vue";
import TnReferenceNoContentPanel from "@/components/references/TnReferenceNoContentPanel.vue";
import TnReferencePagePanel from "@/components/references/TnReferencePagePanel.vue";
import {
  isAbort,
  isError,
  isLoading,
  isNo,
  isValid,
  useSmartFetch
} from "@/composables/useSmartFetch.ts";
import TnModal from "@/components/modal/TnModal.vue";
import type {ReferenceService} from "@/services/reference.service.types.ts";
import type {
  ReferenceItem,
  ReferencePageResult,
  ReferenceResult,
  SmartFetchParams
} from "@/components/references/types.ts";
import type {ReferenceTableColumn, ReferenceTableProperty} from "@/services/types.ts";
import TnReferenceLoadingPanel from "@/components/references/TnReferenceLoadingPanel.vue";
import TnForm from "@/components/forms/TnForm.vue";
import type {ValuesTypes} from "@/components/forms/types.ts";

const props = defineProps<{
  modelValue?: ReferenceItem
}>();

const {t} = useI18n();

const router = useRouter();
const route = useRoute();
const toast = useToast();
const refService = ref<ReferenceService<T>>(referenceService<T>(props.modelValue?.value ?? "",
  toast,
  true));
const createDialog = ref(false);
const modifyDialog = ref(false);
const modifyData = ref<Record<string, unknown>>({});

const isSearch = computed(() => "search" in route.query);
const searchValue = computed(() => route.query.searchValue as string);
const pageNotSuccess = computed(() => pageLoading.value
  || isError(pageContent.value)
  || isAbort(pageContent.value)
  || isLoading(pageContent.value)
  || isNo(pageContent.value));

const setIsSearch = async (value: boolean) => await router.push({
  query: {
    ...route.query,
    search: value ? "true" : undefined,
    searchValue: undefined
  }
});

const setSearchValue = async (value?: string) => await router.push({
  query: {
    ...route.query,
    searchValue: value
  }
});
const getService = (disableOnSuccess: boolean = true) => {
  if (props.modelValue)
    refService.value = referenceService<T>(props.modelValue?.value ?? "", toast, disableOnSuccess);
};

const getColumns = async (params: SmartFetchParams) => {
  getService();
  if (!props.modelValue || !refService.value) return noContent;
  return await refService.value.tableColumns(params);
};

const getPage = async (params: SmartFetchParams) => {
  getService();
  if (!props.modelValue || !refService.value) return noContent;
  return await refService.value.getAll(route.query, params);
};

const getCreationProperties = async (params: SmartFetchParams) => {
  getService();
  if (!props.modelValue || !refService.value) return noContent;
  return await refService.value.tableCreationProperties(params);
};

const getModificationProperties = async (params: SmartFetchParams) => {
  getService();
  if (!props.modelValue || !refService.value) return noContent;
  return await refService.value.tableModificationProperties(params);
};

const getDefault = async (params: SmartFetchParams) => {
  getService();
  if (!props.modelValue || !refService.value) return noContent;
  return await refService.value.tableDefault<ValuesTypes>(params);
};

const createReference = async (params: SmartFetchParams) => {
  getService(false);
  if (!props.modelValue || !refService.value) return;
  const {data, ...rest} = params;
  return await refService.value.create(data as never, rest);
};

const modifyReference = async (params: SmartFetchParams) => {
  getService(false);
  if (!props.modelValue || !refService.value) return;
  const {data, ...rest} = params;
  if (data && modifyData.value.id)
    return await refService.value.update(
      Number.parseInt(modifyData.value.id as string), data, rest);
};

const deleteReference = async (params: SmartFetchParams) => {
  getService(false);
  if (!props.modelValue || !refService.value) return;
  const {id, ...rest} = params;
  if (id)
    return await refService.value.delete(id, rest);
};

const enableModification = (data: never) => {
  modifyDialog.value = true;
  modifyData.value = data;
};

const refresh = async <T>(result: ReferenceResult<T>) => {
  if (isValid(result)) {
    modifyDialog.value = false;
    createDialog.value = false;
    await pageExecute({});
  }
};

const submitCreation = async (values: Record<string, unknown>) => {
  await createExecute({data: values as never});
  await refresh(createContent.value);
};

const submitModification = async (values: Record<string, unknown>) => {
  await modifyExecute({data: values as never, id: values.id as never});
  await refresh(modifyContent.value);
};

const submitDelete = async (values: object) => {
  await deleteExecute(values as SmartFetchParams);
  await refresh(deleteContent.value);
};

const {
  result: pageContent,
  loading: pageLoading,
  execute: pageExecute
} = useSmartFetch<ReferencePageResult<never>>(getPage, loadingContent);
const {
  result: columnsContent,
  // loading: columnsLoading,
  execute: columnsExecute
} = useSmartFetch<ReferenceResult<ReferenceTableColumn[]>>(getColumns, loadingContent);
const {
  result: creationContent,
  loading: creationLoading,
  execute: creationExecute
} = useSmartFetch<ReferenceResult<ReferenceTableProperty[]>>(getCreationProperties, loadingContent);
const {
  result: modificationContent,
  loading: modificationLoading,
  execute: modificationExecute,
} = useSmartFetch<ReferenceResult<ReferenceTableProperty[]>>(getModificationProperties, loadingContent);
const {
  result: defaultContent,
  loading: defaultLoading,
  execute: defaultExecute,
} = useSmartFetch<ReferenceResult<ValuesTypes>>(getDefault, loadingContent);
const {
  result: createContent,
  loading: createLoading,
  execute: createExecute,
  controller: createController
} = useSmartFetch<ReferenceResult<undefined>>(createReference, loadingContent);
const {
  result: modifyContent,
  loading: modifyLoading,
  execute: modifyExecute,
  controller: modifyController
} = useSmartFetch<ReferenceResult<undefined>>(modifyReference, loadingContent);
const {
  result: deleteContent,
  execute: deleteExecute
} = useSmartFetch<ReferenceResult<object | undefined>>(deleteReference, loadingContent);

const reloadAll = async () => {
  await Promise.all([
    pageExecute({}),
    columnsExecute({}),
    creationExecute({}),
    modificationExecute({}),
    defaultExecute({})
  ]);
};

onBeforeMount(reloadAll);

watch(() => props.modelValue, reloadAll);
watch(() => route.query.page, async () => await pageExecute({}));
watch(() => route.query.size, async () => await pageExecute({}));
watch(() => route.query.sort, async () => await pageExecute({}));
watch(() => route.query.searchValue, async () => await pageExecute({}));

watch(() => createDialog.value, open => !open && createController.value?.abort());
watch(() => modifyDialog.value, open => !open && modifyController.value?.abort());
</script>

<style scoped>

</style>

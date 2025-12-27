<template>
  <div class="tn-primitive-form-input">
    <div class="tn-primitive-input">
      <p>{{ props.text }} <span v-if="props.required" class="required-star">*</span></p>
      <div class="flex flex-col gap-1">
        <IconField :class="{
            'cursor-pointer': !(loading || !isValid(result)),
            'cursor-default': loading || !isValid(result),
            '!max-w-full transition-all duration-50': true
          } " @click="toggle">
          <InputText :class="{
                       '!w-full': true,
                        'cursor-pointer': !(loading || !isValid(result)),
                        'cursor-default': loading || !isValid(result),
                     }"
                     :disabled="loading || !isValid(result)"
                     :invalid="errorMessage !== undefined"
                     :model-value="selected.length > 0 ?
                        t('app.multiple_select') : ''"
                     :placeholder="props.placeholder"
                     readonly/>
          <InputIcon :class="{
              'pi chevron': true,
              'pi-spinner p-icon-spin animation': loading || !isValid(result),
              'chevron-rotate': isOpen,
              'pi-chevron-down p-button-text cursor-pointer': !(loading || !isValid(result))
            }"/>
        </IconField>
        <Listbox v-if="isOpen"
                 v-model="selected"
                 :data-key="props.fetchValueKey"
                 :empty-filter-message="loading || !isValid(result) ?
                  t('app.form.list.loading') : t('app.form.list.empty')"
                 :focusOnHover="false"
                 :loading="loading || !isValid(result)"
                 :name="props.name"
                 :option-label="props.display"
                 :option-value="props.fetchValueKey"
                 :options="options"
                 :pt="{
                       root: {
                         'id': `form-${props.name}`,
                         'class': {
                           'animate-duration-500 overflow-hidden !max-w-full': true
                         }
                       },
                       header: {
                         'class': '!px-2 !z-[0]'
                       },
                       optionLabel: {
                         'class': '!max-w-full !truncate'
                       },
                       label: {
                         'class': '!max-w-full !truncate',
                       },
                       overlay: {
                         'class': `lg:!max-w-sm`
                       }
                      }"
                 checkmark
                 fluid
                 multiple>
          <template #header>
            <div>
              <IconField class="flex">
                <InputText v-model="search" v-auto-focus fluid/>
                <InputIcon v-if="search" class="pi pi-times p-button-text cursor-pointer"
                           @click.stop="search = ''"/>
                <InputIcon v-else class="pi pi-search"/>
              </IconField>
            </div>
          </template>
          <template #empty>
            <div v-if="loading || !isValid(result)">
              {{ t("app.form.list.loading") }}
            </div>
            <slot v-else name="empty">
              {{ t("app.form.list.empty") }}
            </slot>
          </template>
        </Listbox>
      </div>
    </div>
    <Message v-if="errorMessage !== undefined" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
  </div>
</template>


<script generic="T extends unknown" lang="ts" setup>
import {useToast} from "primevue";
import {computed, onMounted, ref, watch} from "vue";
import {formService} from "@/services/form.service.ts";
import type {ReferencePageResult, SmartFetchParams} from "@/components/references/types.ts";
import {loadingContent, noContent} from "@/components/references/const.ts";
import {isValid, isValidPage, useSmartFetch} from "@/composables/useSmartFetch.ts";
import {useI18n} from "vue-i18n";
import {useField} from "vee-validate";

const props = defineProps<{
  name?: string
  text?: string
  placeholder?: string
  fetch?: string
  fetchValueKey?: string
  display?: string
  required?: boolean
}>();

const {t} = useI18n();
const toast = useToast();
const {value: selected, errorMessage} = useField<unknown[]>(() => props.name ?? "");
const search = ref("");
const isOpen = ref(false);
const selectedOption = ref<T[] | undefined>(undefined);
const service = computed(() => props.fetch ? formService(props.fetch, toast, true) : undefined);
const options = computed(() => {
  const r = result.value && isValidPage(result.value) ? [...result.value.content] : [];
  if (selected.value && selectedOption.value) {
    if (r.some(e => selected.value.includes((e as never)[props.fetchValueKey as never]))) return r;
    return [...selectedOption.value, ...r];
  }
  return r;
});

const toggle = () => {
  if (loading.value || !isValid(result.value)) return;
  isOpen.value = !isOpen.value;
};

const getOption = (value?: unknown[]) => {
  return options.value.filter(opt => value?.includes((opt as never)[props.fetchValueKey as never]));
};

const getPage = async (params: SmartFetchParams) => {
  if (!service.value) return noContent;
  return await service.value.getAll<T>({
    size: "5",
    searchValue: search.value,
    ids: selected.value ? [`${selected.value}`] : []
  }, params);
};

const {
  loading,
  execute,
  result
} = useSmartFetch<ReferencePageResult<T>>(getPage, loadingContent);

const reload = async () => {
  await execute({});
  if (selected.value)
    selectedOption.value = getOption(selected.value);
};

onMounted(reload);

watch(() => search.value, async () => await reload());
watch(() => selected.value, (key) => selectedOption.value = key ? getOption(key) : undefined);
</script>

<style scoped>
</style>

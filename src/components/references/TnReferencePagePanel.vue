<template>
  <DataTable
    :loading="props.loading"
    :pt="{
        root: 'relative full !max-w-full',
        tableContainer: 'full !max-w-full overflow-y-auto',
        table: '!max-w-full overflow-visible',
        thead: 'sticky top-0 z-[1] bg-[var(--p-datatable-header-cell-border-color)]'
    }"
    :sort-field="sortValue.field"
    :sort-order="sortValue.order"
    :value="props.modelValue?.content"
    removable-sort
    show-gridlines
    sort-mode="single"
    @sort="sortPage">
    <template #loading>
      <TnReferenceLoadingPanel/>
    </template>
    <template #empty>
      <TnReferenceEmptyPanel/>
    </template>
    <Column v-for="(col, index) in columns"
            :key="index"
            :class="{
              '!max-w-sm truncate': true
            }"
            :field="col.name"
            :header="getHeader(col.name)"
            :sortable="col.sortable"/>
    <Column
      class="w-[1%] whitespace-nowrap sticky right-0 bg-[var(--p-datatable-row-background)] z-0">
      <template #body="{data}">
        <Button :loading="dataLoading[data[props.identifier]]"
                class="!p-0 !w-6 !h-6"
                icon="pi pi-cog"
                severity="secondary"
                text
                @click="toggle($event, data as never)"></Button>
      </template>
    </Column>
    <Menu id="navbar-menu"
          ref="menu"
          :model="getMenuItems()" popup/>
    <teleport :to="props.titleId">
      <slot :data="pagination" name="title"/>
    </teleport>
    <teleport :to="props.paginationId">
      <Paginator :first="getFirst(
             pagination?.page.number ?? 0,
             pagination?.page.size ?? 0)"
                 :rows="sizeValue"
                 :rowsPerPageOptions="[5, 10, 20, 40]"
                 :totalRecords="pagination?.page.totalElements"
                 @page="updatePage"/>
    </teleport>
    <teleport :to="props.createId">
      <slot/>
    </teleport>
  </DataTable>
</template>

<script generic="T extends never" lang="ts" setup>
import {useI18n} from "vue-i18n";
import type {Page, ReferenceResult} from "@/components/references/types.ts";
import {
  type DataTableSortEvent,
  Menu,
  type MenuMethods,
  type PageState,
  useConfirm
} from "primevue";
import {referenceDeletionConfirm} from "@/confirms/reference.confirm.ts";
import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import TnReferenceLoadingPanel from "@/components/references/TnReferenceLoadingPanel.vue";
import TnReferenceEmptyPanel from "@/components/references/TnReferenceEmptyPanel.vue";
import type {ReferenceTableColumn} from "@/services/types.ts";

const {t} = useI18n();
const confirm = useConfirm();
const router = useRouter();
const route = useRoute();

const props = defineProps<{
  modelValue?: Page<T>,
  referenceName: string,
  columns?: ReferenceResult<ReferenceTableColumn[]>,
  deleteFn: (data: T) => Promise<void>,
  identifier: string,
  paginationId: string,
  createId: string,
  titleId: string,
  loading: boolean
}>();

const emits = defineEmits<{
  (e: "edit", data: T): void,
  (e: "delete", data: T): void
}>();

const pagination = ref<Page<never>>({
  content: [],
  page: {
    number: 0,
    size: 0,
    totalPages: 0,
    totalElements: 0
  }
});
const dataLoading = ref<Record<string, boolean>>({});
const menu = ref<MenuMethods>();
const selectedData = ref<T>();
const sortValue = computed(() => {
  const value = ((route.query.sort as string) ?? "").split(",");
  return {
    field: value[0],
    order: getOrder(value[1])
  };
});
const sizeValue = computed(() => {
  return pagination.value?.page.size ?? Number.parseInt(route.query.size as string);
});
const columns = computed(() => Array.isArray(props.columns)
  ? [...props.columns].sort((a, b) => a.order - b.order)
  : []);

const getMenuItems = () => [
  {
    label: t("app.references.edit"),
    icon: "pi pi-pencil",
    command: () => selectedData.value && emits("edit", selectedData.value)
  },
  {
    label: t("app.references.delete"),
    icon: "pi pi-trash",
    command: () => selectedData.value && deleteData(selectedData.value)
  }
];
const toggle = (event: PointerEvent, data: never) => {
  selectedData.value = data;
  menu.value?.toggle(event);
};

const setPagination = (page?: Page<never>) => {
  if (page) {
    pagination.value = page;
  }
};

const setQuery = async (queries: Record<string, string[] | string | undefined>, clear: boolean = false) => {
  await router.push({
    query: clear ? queries : {
      ...route.query,
      ...queries
    }
  });
};

const getOrder = (value?: string) => {
  switch (value) {
    case "asc":
      return 1;
    case "desc":
      return -1;
    default:
      return 0;
  }
};

const getDirection = (value?: 0 | -1 | 1 | null) => {
  switch (value) {
    case 1:
      return "asc" as const;
    case -1:
      return "desc" as const;
    default:
      return undefined;
  }
};

const sortPage = async (event: DataTableSortEvent) => {
  if (typeof event.sortField === "string") {
    await setQuery({
      sort: `${event.sortField},${getDirection(event.sortOrder)}`,
    });
  } else if (!event.sortField && !event.sortOrder) {
    await setQuery({
      sort: undefined,
    });
  }
};
const updatePage = async ({page, rows}: PageState) => {
  await setQuery({
    page: `${page}`,
    size: `${rows}`
  });
};
const getFirst = (page: number, row: number) => {
  return (page) * row;
};
const getHeader = (column: string) => {
  return t(`app.${props.referenceName}.${column}`);
};
const deleteData = (data: T) => {
  const identifier = data[props.identifier];
  dataLoading.value[identifier] = true;
  confirm.require(referenceDeletionConfirm({
    name: props.referenceName ?? "",
    accept: async () => {
      await props.deleteFn(data);
      if (identifier)
        delete dataLoading.value[identifier];
      emits("delete", data);
    },
    reject: () => {
      if (identifier)
        delete dataLoading.value[identifier];
    },
    onHide: () => {
      if (identifier)
        delete dataLoading.value[identifier];
    }
  }));
};
watch(() => props.modelValue, setPagination);
</script>

<style scoped>

</style>

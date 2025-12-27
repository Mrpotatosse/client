<template>
  <Form
    v-slot="{errors}"
    :initial-values="props.values"
    :validation-schema="schema"
    class="tn-form !max-w-full"
    @submit="formSubmit"
  >
    <TnFormContent :properties="properties"
                   name-key="name"
                   type-key="type">
      <template #string="{data}">
        <TnString :name="data.value.name"
                  :placeholder="t(`app.references.${props.name}.${data.value.name}.placeholder`)"
                  :required="data.value.required"
                  :text="t(`app.references.${props.name}.${data.value.name}`)"
        />
      </template>
      <template #number="{data}">
        <TnNumber :name="data.value.name"
                  :placeholder="t(`app.references.${props.name}.${data.value.name}.placeholder`)"
                  :required="data.value.required"
                  :text="t(`app.references.${props.name}.${data.value.name}`)"
        />
      </template>
      <template #boolean="{data}">
        <TnBoolean :name="data.value.name"
                   :text="t(`app.references.${props.name}.${data.value.name}`)"/>
      </template>
      <template #list="{data}">
        <div v-if="isNumber(data.type.generic)">list number</div>
        <div v-else-if="isString(data.type.generic)">list string</div>
        <div v-else-if="isBoolean(data.type.generic)">list boolean</div>
        <TnListObject v-else
                      :display="data.value.display"
                      :fetch="data.value.fetch"
                      :fetch-value-key="data.value.fetchValueKey"
                      :name="data.value.name"
                      :placeholder="t(`app.references.${props.name}.${data.value.name}.placeholder`)"
                      :required="data.value.required"
                      :text="t(`app.references.${props.name}.${data.value.name}`)"
                      :type="data.type.type"/>
      </template>
      <template #object="{data}">
        <TnObject :display="data.value.display"
                  :fetch="data.value.fetch"
                  :fetch-value-key="data.value.fetchValueKey"
                  :name="data.value.name"
                  :placeholder="t(`app.references.${props.name}.${data.value.name}.placeholder`)"
                  :required="data.value.required"
                  :text="t(`app.references.${props.name}.${data.value.name}`)"
        />
      </template>
    </TnFormContent>

    <div class="flex gap-2 justify-end">
      <Button
        :label="t(`app.references.${props.name}.cancel`)"
        outlined
        @click="emits('cancel')"
      />
      <Button
        :disabled="Object.keys(errors).length !== 0 || props.loading"
        :label="t(`app.references.${props.name}.submit`)"
        :loading="props.loading"
        type="submit"
      />
    </div>
  </Form>
</template>

<script lang="ts" setup>

import {Form} from "vee-validate";
import TnString from "@/components/forms/TnString.vue";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import type {ReferenceTableProperty} from "@/services/types.ts";
import TnNumber from "@/components/forms/TnNumber.vue";
import TnBoolean from "@/components/forms/TnBoolean.vue";
import TnFormContent from "@/components/forms/TnFormContent.vue";
import TnListObject from "@/components/forms/TnListObject.vue";
import TnObject from "@/components/forms/TnObject.vue";
import {buildValidator} from "@/validators/form.validator.ts";
import type {ValuesTypes} from "@/components/forms/types.ts";
import {isBoolean, isNumber, isString} from "@/components/forms/utils.ts";


const props = defineProps<{
  name?: string
  properties: ReferenceTableProperty[]
  values?: ValuesTypes
  loading: boolean
}>();

const emits = defineEmits<{
  (e: "submit", values: ValuesTypes): void,
  (e: "cancel"): void
}>();

const {t} = useI18n();

const schema = ref(buildValidator(props.properties));
const properties = computed(() => [...props.properties].sort((a, b) => a.order - b.order));

const reconstruct = (values: ValuesTypes) => {
  const result: ValuesTypes = {};
  for (const property of props.properties) {
    if (property.name in values) {
      result[property.name] = values[property.name];
    }
  }
  return result;
};

const formSubmit = (values: ValuesTypes) => emits("submit", reconstruct(values));
</script>

<style scoped>

</style>

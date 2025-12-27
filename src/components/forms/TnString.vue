<template>
  <div class="tn-primitive-form-input">
    <div class="tn-primitive-input">
      <p>{{ props.text }} <span v-if="props.required" class="required-star">*</span></p>
      <InputText v-model="value"
                 :invalid="errorMessage !== undefined"
                 :placeholder="props.placeholder"
                 fluid
                 type="text"/>
    </div>
    <Message v-if="errorMessage !== undefined" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<script lang="ts" setup>

import {useField} from "vee-validate";

const props = defineProps<{
  name?: string
  text?: string
  placeholder?: string
  required?: boolean
}>();

const {value, errorMessage} = useField<string>(() => props.name ?? "");
</script>

<style scoped>

</style>

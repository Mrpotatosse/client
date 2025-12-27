<template>
  <div class="flex flex-col w-full gap-1">
    <div class="flex items-center w-full gap-4">
      <p>{{ props.text }}</p>
      <ToggleSwitch v-model="value"
                    :invalid="errorMessage !== undefined"
                    :name="props.name"/>
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
}>();

const {value, errorMessage} = useField<string>(() => props.name ?? "");
</script>

<style scoped>

</style>

<template>
  <teleport to="body">
    <div v-if="props.modelValue" class="tn-modal" @click="close">
      <Panel class="!min-w-sm" @click.stop>
        <template #header>
          <div class="full flex justify-between">
            <div>
              <slot name="header"/>
            </div>
            <div>
              <Button icon="pi pi-times"
                      rounded
                      severity="secondary"
                      text
                      @click="close"/>
            </div>
          </div>
        </template>
        <slot/>
      </Panel>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue?: boolean }>();
const emits = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const close = () => emits("update:modelValue", false);
</script>

<style scoped>

</style>

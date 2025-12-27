<template>
  <teleport to="body">
    <div v-if="props.modelValue" :class="{
      'tn-modal': true
    }">
      <div class="fluid-flex-centered !max-h-[95%]">
        <Panel v-auto-scroll
               :class="{
                'overflow-x-hidden relative !max-h-full !h-fit': true,
                'lg:!max-w-xl': !props.fullScreen
             }"
               :pt="{
              header: {
                'class': {
                  'sticky !top-0 !bg-[var(--p-panel-background)] z-[1] lg:!min-w-xl':
                  true,
                  'lg:!max-w-xl': !props.fullScreen
                }
              }
             }" @click.stop>
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
    </div>
  </teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue?: boolean,
  fullScreen?: boolean // todo: add a fullscreen mode
}>();
const emits = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const close = () => emits("update:modelValue", false);
</script>

<style scoped>
</style>

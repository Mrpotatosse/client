<template>
  <div class="full flex gap-2">
    <TnReferenceListbox>
      <template #default="{data}">
        <TnReferencePanel :model-value="data"/>
      </template>
    </TnReferenceListbox>
  </div>
</template>

<script lang="ts" setup>
import TnReferenceListbox from "@/components/references/TnReferenceListbox.vue";
import TnReferencePanel from "@/components/references/TnReferencePanel.vue";
</script>

<style scoped>

</style>

<template>
  <div>
    <Button @click="test">this is a test</Button>
    <Button @click="test2">OKOK</Button>
  </div>
</template>

<script lang="ts" setup>
import {referenceService} from "@/services/reference.service.ts";
import {api} from "@/clients";
import {useToast} from "primevue";

const toast = useToast();

// todo: remove this shit
const test = () => referenceService("test", toast)?.create({
  label: "this is ok2" + (Math.random() * 99999999),
  description: ",,???"
});
const test2 = () => api.get("references/test/okok");
</script>

<style scoped>

</style>

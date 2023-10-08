<script setup lang="ts">
import YAML from "yaml";
import { Codemirror } from "vue-codemirror";

const props = defineProps<{
  resource: any;
}>();

const { resource } = toRefs(props);

const format = ref(localStorage.getItem("default-resource-format") || "yaml");

watch(format, () => {
  localStorage.setItem("default-resource-format", format.value);
});

const resourceString = computed(() => {
  if (format.value === "yaml") {
    return YAML.stringify(resource.value);
  } else {
    return JSON.stringify(resource.value, null, 2);
  }
});
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full py-3 flex flex-row justify-between">
      <USelect v-model="format" :options="['yaml', 'json']"></USelect>
      <span></span>
    </div>
    <hr />
    <div class="w-full">
      <codemirror
        ref="codemirror"
        :disabled="true"
        :indent-with-tab="true"
        :tab-size="2"
        :model-value="resourceString"
      ></codemirror>
    </div>
  </div>
</template>

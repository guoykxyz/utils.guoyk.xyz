<template>
  <div class="flex flex-col">
    <div class="w-full py-3 flex flex-row justify-between">
      <select id="select-format" class="form-select" v-model="format">
        <option value="yaml">yaml</option>
        <option value="json">json</option>
      </select>
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

<script>
import YAML from "yaml";
import { Codemirror } from "vue-codemirror";

export default {
  name: "ResourceOutput",
  components: { Codemirror },
  props: ["resource"],
  mounted() {
    this.format = localStorage.getItem("default-resource-format") || "yaml";
  },
  methods: {
    doCopy() {},
  },
  computed: {
    resourceString() {
      if (this.format === "yaml") {
        return YAML.stringify(this.resource);
      } else {
        return JSON.stringify(this.resource, null, 2);
      }
    },
  },
  watch: {
    format(format) {
      localStorage.setItem("default-resource-format", format);
    },
  },
  data() {
    return {
      format: "yaml",
    };
  },
};
</script>

<style scoped>
#select-format {
  width: 12rem;
}
</style>

<script setup>
import ResourceOutput from "@/components/ResourceOutput.vue";
import UtilityPageLayout from "@/components/UtilityPageLayout.vue";
</script>

<template>
  <UtilityPageLayout>
    <template #sidebar>
      <form>
        <div class="flex flex-col">
          <label for="input-name" class="mb-2">name</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-name"
            v-model="item.name"
          />
          <label for="input-namespace" class="mb-2">namespace</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-namespace"
            v-model="item.namespace"
          />
          <label for="input-type" class="mb-2">type</label>
          <select
            v-model="item.type"
            class="mb-3 w-full"
            aria-label="input-type"
          >
            <option selected value="configmap">ConfigMap</option>
            <option value="secret">Secret</option>
          </select>
          <label for="input-files" class="mb-2">files</label>
          <input
            @change="onFilesChanged"
            type="file"
            id="input-files"
            class="mb-3 w-full"
            name="files"
            multiple
          />
        </div>
      </form>
    </template>
    <template #default>
      <ResourceOutput :resource="resource" />
    </template>
  </UtilityPageLayout>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  name: "ViewK8sFilesToConfig",
  methods: {
    async onFilesChanged(elem) {
      const data = {};
      for (const file of elem.target.files) {
        const res = await new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.onload = function (event) {
            resolve(event.target.result);
          };
          reader.onerror = function (e) {
            reject(e);
          };
          reader.readAsBinaryString(file);
        });
        data[file.name] = Base64.encode(res);
      }
      this.item.data = data;
    },
  },
  computed: {
    resource() {
      let res = {};
      if (this.item.type === "configmap") {
        res = {
          apiVersion: "v1",
          kind: "ConfigMap",
          metadata: {
            name: this.item.name,
          },
          binaryData: this.item.data,
        };
      } else {
        res = {
          apiVersion: "v1",
          kind: "Secret",
          metadata: {
            name: this.item.name,
          },
          type: "Opaque",
          data: this.item.data,
        };
      }
      if (this.item.namespace) {
        res.metadata.namespace = this.item.namespace;
      }
      return res;
    },
  },
  data() {
    return {
      item: {
        name: "name",
        namespace: "",
        type: "configmap",
        data: {},
      },
    };
  },
};
</script>

<style scoped></style>

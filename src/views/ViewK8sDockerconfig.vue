<script setup>
import ResourceOutput from "@/components/ResourceOutput.vue";
import UtilityPageLayout from "@/components/UtilityPageLayout.vue";
</script>

<template>
  <UtilityPageLayout>
    <template #sidebar>
      <form>
        <div class="flex flex-col">
          <label for="input-name" class="mb-1">name</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-name"
            v-model="item.name"
          />
          <label for="input-namespace" class="mb-1">namespace</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-namespace"
            v-model="item.namespace"
          />
          <label for="input-registry" class="mb-1">registry</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-registry"
            v-model="item.registry"
          />
          <label for="input-username" class="mb-1">username</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-username"
            v-model="item.username"
          />
          <label for="input-password" class="mb-1">password</label>
          <input
            type="text"
            class="mb-3 w-full"
            id="input-password"
            v-model="item.password"
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
  name: "ViewK8sDockerconfig",
  computed: {
    resource() {
      const auths = {};
      auths[this.item.registry] = {
        auth: Base64.encode(this.item.username + ":" + this.item.password),
      };
      const data = Base64.encode(JSON.stringify({ auths }));
      const res = {
        apiVersion: "v1",
        kind: "Secret",
        metadata: {
          name: this.item.name,
        },
        type: "kubernetes.io/dockerconfigjson",
        data: {
          ".dockerconfigjson": data,
        },
      };
      if (this.item.namespace) {
        res.metadata.namespace = this.item.namespace;
      }
      return res;
    },
  },
  data() {
    return {
      item: {
        name: "secret-name",
        namespace: "",
        registry: "registry.com",
        username: "username",
        password: "password",
      },
    };
  },
};
</script>

<style scoped></style>

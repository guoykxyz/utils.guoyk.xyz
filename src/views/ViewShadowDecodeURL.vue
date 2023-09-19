<script setup>
import UtilityPageLayout from "@/components/UtilityPageLayout.vue";
</script>

<template>
  <UtilityPageLayout>
    <template #sidebar>
      <div class="flex flex-col">
        <label for="input-url" class="mb-2">URL</label>
        <textarea
          :placeholder="inputPlaceholder"
          class="mb-3 w-full"
          id="input-url"
          v-model="input"
          rows="32"
        ></textarea>
      </div>
    </template>
    <template #default>
      <ResourceOutput :resource="resource" />
    </template>
  </UtilityPageLayout>
</template>

<script>
import { Base64 } from "js-base64";
import ResourceOutput from "@/components/ResourceOutput.vue";

export default {
  name: "ViewShadowDecodeURL",
  components: { ResourceOutput },
  computed: {
    resource() {
      let input = this.input;
      if (!input) {
        return {};
      }
      try {
        if (input.startsWith("ss://")) {
          input = input.substring(5);
        } else if (input.startsWith("ssr://")) {
          input = input.substring(6);
        }
        input = Base64.decode(input);
        let mainAndArgs = input.split("/?");
        let items = mainAndArgs[0].split(":");
        let res = {
          server: items[0],
          server_port: Number(items[1]),
          local_address: "0.0.0.0",
          local_port: 1080,
          protocol: items[2],
          method: items[3],
          obfs: items[4],
          password: Base64.decode(items[5]),
        };
        let args = new URLSearchParams(mainAndArgs[1]);
        if (args.has("obfsparam")) {
          res.obfs_param = Base64.decode(args.get("obfsparam"));
        }
        return res;
      } catch (e) {
        return { error: e.toString() };
      }
    },
  },
  data() {
    return {
      inputPlaceholder:
        "ssr://YzNiMDMxYjliYTgzMGU1ZWQ5NmUyZjAzMzZkMjVlYzNhZjVmZTgzZjg3NjYxYjAwOTI3MDdjNjA1NjNjMmFiNQo=",
      input: "",
    };
  },
};
</script>

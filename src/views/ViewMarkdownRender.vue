<script setup>
import UtilityPageLayout from "@/components/UtilityPageLayout.vue";
</script>

<template>
  <UtilityPageLayout>
    <template #sidebar>
      <div class="flex flex-col">
        <label for="input-content" class="mb-2">content</label>
        <textarea
          class="mb-3 w-full"
          v-model="item.content"
          rows="32"
        ></textarea>
      </div>
    </template>
    <template #default>
      <div id="render-result" v-html="contentHTML"></div>
    </template>
  </UtilityPageLayout>
</template>

<script>
import { marked } from "marked";

export default {
  name: "ViewMarkdownRender",
  computed: {
    contentHTML() {
      return marked(this.item.content);
    },
  },
  data() {
    return {
      item: {
        content: "# Hello World",
      },
    };
  },
};
</script>

<style>
div#render-result {
  font-size: 1.2rem;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

div#render-result blockquote {
  padding-left: 0.6rem;
  border-left: 4px solid whitesmoke;
}

div#render-result h1 {
  border-left: 4px gray solid;
  padding-left: 0.8rem;
  font-size: 1.8rem;
  margin-top: 1.4rem;
  margin-bottom: 1.8rem;
}

div#render-result h2 {
  font-size: 1.6rem;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}

div#render-result h3 {
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

div#render-result h4 {
  font-size: 1.2rem;
  margin-top: 0.8rem;
}

div#render-result h5 {
  font-size: 1rem;
}

div#render-result img {
  max-width: 90%;
  max-height: 32rem;
  padding: 0.4rem;
}

div#render-result pre code {
  font-size: 0.8rem;
}
</style>

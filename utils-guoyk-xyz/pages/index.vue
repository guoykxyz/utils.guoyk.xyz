<script setup lang="ts">
definePageMeta({
  layout: "fullscreen",
});

const items = computed(() => useUtilities());
</script>

<template>
  <div class="flex flex-col items-left pl-4">
    <template v-for="item in items" v-bind:key="item.name">
      <h5 v-if="item.isGroup" class="my-2">
        <b>{{ item.name }}</b>
      </h5>
      <p class="mb-2" v-else>
        <ULink
          class="underline"
          v-if="!item.isGroup"
          :to="{ name: item.routeName }"
        >
          <span>{{ item.name }}</span>
        </ULink>
      </p>
    </template>
  </div>
</template>

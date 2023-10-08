<script setup lang="ts">
const items = computed(() => {
  return useUtilities().map((item) => ({
    name: item.name,
    value: item.routeName,
    disabled: !!item.isGroup,
  }));
});

const none = "_none";

const router = useRouter();
const route = useRoute();

const selected = ref(route.name?.toString() || none);

watch(
  () => route.path,
  () => {
    selected.value = route.name?.toString() || none;
  }
);

watch(selected, () => {
  router.replace({ name: selected.value });
});
</script>

<template>
  <UContainer>
    <div
      class="w-full flex flex-col lg:flex-row justify-between items-center lg:items-baseline py-3"
    >
      <UButton
        :to="{ name: 'index' }"
        variant="link"
        size="xl"
        label="yk::utilities"
      ></UButton>

      <USelect
        v-model="selected"
        :options="items"
        option-attribute="name"
      ></USelect>
    </div>

    <div class="w-full mb-5">
      <hr />
    </div>

    <div class="w-full mb-4 px-4">
      <p class="font-semibold text-lg">{{ route.meta.utilityTitle }}</p>
      <p>{{ route.meta.utilityDescription }}</p>
    </div>

    <slot></slot>

    <div class="w-full my-5">
      <hr />
    </div>

    <div
      class="w-full flex flex-col justify-center items-center py-8 px-4 text-sm"
    >
      <p class="mb-2">
        This website does not include any third party links, thus cryptography
        utilities are safe to use.
      </p>
      <p>
        If you encounter any problems, feel free to
        <a
          class="underline"
          target="_blank"
          href="https://github.com/guoykxyz/utils.guoyk.xyz/issues"
          >create a issue</a
        >
      </p>
    </div>
  </UContainer>
</template>

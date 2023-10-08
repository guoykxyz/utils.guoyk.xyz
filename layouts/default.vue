<script setup lang="ts">
const items = computed(() => {
  const result: Array<{ name: string; value: string; disabled?: boolean }> = [];

  useUtilitiesSummary().forEach((group) => {
    result.push({
      name: group.group,
      value: group.group,
      disabled: true,
    });

    group.items.forEach((item) => {
      result.push({
        name: group.group + " :: " + item.title,
        value: item.route.name,
      });
    });
  });

  return result;
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
  <Head>
    <Title
      >yk::utilities - {{ route.meta.utilityGroup }} ::
      {{ route.meta.utilityTitle }}</Title
    >
  </Head>

  <UContainer>
    <div
      class="w-full flex flex-col lg:flex-row justify-between items-center lg:items-baseline py-3"
    >
      <UButton
        :to="{ name: 'index' }"
        variant="link"
        icon="i-bi-tools"
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
      <p class="font-semibold text-lg">
        {{ route.meta.utilityGroup }} :: {{ route.meta.utilityTitle }}
      </p>
      <p>{{ route.meta.utilityDescription }}</p>
    </div>

    <slot></slot>

    <div class="w-full pb-4"></div>

    <Footer></Footer>
  </UContainer>
</template>

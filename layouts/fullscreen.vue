<template>
  <UContainer>
    <div class="w-full flex flex-row justify-center items-center pt-32 pb-4">
      <UIcon name="i-bi-tools" class="text-3xl me-4"></UIcon>
      <span class="text-4xl">yk::utilities</span>
    </div>

    <div class="w-full my-4">
      <hr />
    </div>

    <slot></slot>

    <Footer></Footer>
  </UContainer>
</template>

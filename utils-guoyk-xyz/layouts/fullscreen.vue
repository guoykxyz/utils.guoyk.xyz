<template>
  <UContainer>
    <div class="w-full flex flex-col items-center pt-32">
      <h1 class="text-4xl my-4">
        <b>yk::utilities</b>
      </h1>
    </div>

    <div class="w-full my-4">
      <hr />
    </div>

    <slot></slot>

    <div class="w-full my-4">
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

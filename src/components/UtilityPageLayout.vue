<template>
  <div class="w-full flex flex-row">
    <div class="w-1/4 flex flex-col py-2 px-4">
      <slot name="sidebar"></slot>
    </div>

    <div class="w-3/4 flex flex-col py-2 px-4">
      <slot></slot>
    </div>
  </div>
</template>

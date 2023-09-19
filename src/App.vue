<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex flex-col">
    <template v-if="selected !== '_none'">
      <div class="w-full flex flex-row justify-between items-baseline py-3">
        <h3>
          <router-link class="underline" :to="{ name: 'home' }">
            <b class="ms-2 text-xl">
              <span>yanke's utilities</span>
            </b>
          </router-link>
          <span v-if="selected !== '_none'" class="text-xl">
            :: <small>{{ $route.meta.title }}</small></span
          >
        </h3>
        <select id="main-select" class="form-select" v-model="selected">
          <option value="_none">choose an utility</option>
          <template v-for="item in items" v-bind:key="item.name">
            <option v-if="item.isGroup" disabled>{{ item.name }}</option>
            <option v-else :value="item.routeName">{{ item.name }}</option>
          </template>
        </select>
      </div>
    </template>

    <template v-else>
      <!-- Home -->
      <div class="w-full flex flex-col items-center pt-32">
        <h2 class="text-3xl my-4">
          <span>yanke's utilities</span>
        </h2>
      </div>
    </template>

    <div class="w-full pt-1 pb-5">
      <hr />
    </div>

    <!-- Page -->
    <template v-if="selected !== '_none'">
      <router-view />
    </template>

    <template v-else>
      <div class="flex flex-col items-center">
        <template v-for="item in items" v-bind:key="item.name">
          <h5 v-if="item.isGroup" class="my-2">
            <b>{{ item.name }}</b>
          </h5>
          <p class="mb-2" v-else>
            <router-link
              class="underline"
              v-if="!item.isGroup"
              :to="{ name: item.routeName }"
            >
              <span>{{ item.name }}</span>
            </router-link>
          </p>
        </template>
      </div>
    </template>

    <div class="w-full pt-5">
      <hr />
    </div>

    <div
      class="w-full flex flex-col justify-center items-center py-4 text-sm text-gray-700"
    >
      <p>
        This website does not include any third party links, thus it is safe to
        use cryptography utilities.
      </p>
      <p>
        If you encounter any problems, please
        <a class="underline" href="https://github.com/guoykxyz/utils.guoyk.xyz/issues"
          >create a issue</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    items() {
      const result = [];
      const groups = new Set();
      this.$router
        .getRoutes()
        .filter((route) => route.meta.utils)
        .forEach((route) => {
          groups.add(route.meta.group);
        });
      Array.from(groups)
        .sort()
        .forEach((group) => {
          result.push({ name: group, isGroup: true });
          this.$router
            .getRoutes()
            .filter((route) => route.meta.group === group)
            .forEach((route) => {
              result.push({ name: route.meta.title, routeName: route.name });
            });
        });
      return result;
    },
  },
  watch: {
    "$route.name"(name) {
      for (const item of this.items) {
        if (item.routeName === name) {
          this.selected = name;
          return;
        }
      }
      this.selected = "_none";
    },
    selected(name) {
      if (name === "_none") {
        this.$router.replace({ name: "home" });
      } else {
        this.$router.replace({ name });
      }
    },
  },
  data() {
    return {
      selected: "_none",
    };
  },
};
</script>

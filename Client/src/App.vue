<template>
    <layout>
      <RouterView />
    </layout>
  </template>
  
  <script setup lang="ts">
  import { Component, watch, shallowRef } from "vue";
  import { RouterView, useRoute } from "vue-router";
  import DefaultLayout from "@/layouts/default.vue";
  
  const route = useRoute();
  const layout = shallowRef<Component>(DefaultLayout);
  
//   watch(
//     () => route.meta?.layout,
//     () => {
//       layout.value = route.meta?.layout || DefaultLayout;
//     }
//   );
  </script>
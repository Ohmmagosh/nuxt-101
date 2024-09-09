<script setup lang="ts">
const route = useRoute();

const links = [
  [
    {
      label: "User management",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "Job",
      icon: "i-f7-briefcase",
      to: "/job",
    },
  ],
  [
    {
      label: "Theme",
      icon: "i-wi-moon-alt-first-quarter",
    },
  ],
];
</script>

<template>
  <UHorizontalNavigation
    :links="links"
    class="border-b border-gray-200 dark:border-gray-800"
  >
    <template #default="{ link }">
      <div v-if="link.label == 'Theme'">
        <ColorScheme
          ><USelect
            v-model="useColorMode().value"
            :options="['system', 'light', 'dark']"
        /></ColorScheme>
      </div>
    </template>
  </UHorizontalNavigation>
  <slot></slot>
</template>

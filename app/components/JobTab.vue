

<template>
  <UTabs :items="items" >
    <template #create="{ item }">
      <UCard >
        <template #header>
          <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Make new things here.
          </p>
        </template>

        <!-- body -->
         <JobCreateForm />

         <template #footer>
          <UButton type="submit" color="black">
            Save password
          </UButton>
        </template>
      </UCard>
    </template>

    <template #table="{ item }">
      <UCard >
        <template #header>
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ item.label }}
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            List of things.
          </p>
        </template>

        <div>
          <h1>world</h1>
        </div>

        <template #footer>
          <UButton type="submit" color="black">
            Save password
          </UButton>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>
<script setup lang="ts">
const items = [{
  slot: 'create',
  label: 'Create'
}, {
  slot: 'table',
  label: 'Table'
}]


</script>
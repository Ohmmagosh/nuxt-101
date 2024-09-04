<template>
  <UCard class="">
    <div class="flex py-2 border-b border-gray-200 dark:border-gray-700">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" />
    </div>
    <UTable  :rows="users!" :columns="columns">
      <template #actions-data="{ row }" >
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </UCard>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { TUser } from '../types/user-type';

defineProps<{
  users: TUser[] | null
}>()
const columns = [{
  key: 'username',
  label: 'Username'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'age',
  label: 'Age'
}, {
  label: 'actions',
  key: 'actions'
}]
const selectedColumns = ref([...columns])

const items = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Archive',
    icon: 'i-heroicons-archive-box-20-solid'
  }, {
    label: 'Move',
    icon: 'i-heroicons-arrow-right-circle-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

</script>

<template>
  <div class="mb-9">

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
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { TUser } from '../types/user-type';
const toast = useToast()

const emit = defineEmits<{
  (refresh: 'refresh'): void
}>();

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

async function onDeleteUser(id: string) {
  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/users/delete`, {
      query: { id },
      method: "DELETE",
    })
    toast.add({
      title: 'User Deleted',
      description: 'User has been deleted',
      timeout: 5000,
    })
    emit('refresh')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: "User couldn't be deleted",
      timeout: 5000
    })
  }
}

const items = (row: any) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: async () => console.log('Edit', row._id)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: async () => await onDeleteUser(row._id)
  }]
]

</script>

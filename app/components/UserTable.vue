<template>
  <div class="mb-9">
    <UCard>
      <UTable :rows="users!" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
    <UserEditModal
      v-model="showModal"
      v-show="showModal"
      :open="showModal"
      @closeModal="setCloseModal"
      :userInfomation="userInfomation"
      @refresh="emit('refresh')"
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { TUser } from "../types/user-type";
import Modal from "./UserEditModal.vue";
const toast = useToast();
defineComponent({
  components: {
    Modal,
  },
});



//Modal
const showModal = ref<boolean>(false);
const setOpenShowModal = (data:TUser) => {
  showModal.value = true;
  userInfomation.value = data;
};
const setCloseModal = () => {
  showModal.value = false;
};

const userInfomation = ref<TUser>({
  _id: "",
  username: "",
  email: "",
  age: 0,
});


const emit = defineEmits<{
  (refresh: "refresh"): void;
}>();

defineProps<{
  users: TUser[] | null;
}>();
const columns = [
  {
    key: "username",
    label: "Username",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "age",
    label: "Age",
  },
  {
    label: "actions",
    key: "actions",
  },
];
// const selectedColumns = ref([...columns]);
const items = (row: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => setOpenShowModal(row),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => await onDeleteUser(row._id),
    },
  ],
];


async function onDeleteUser(id: string) {
  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/users/delete`, {
      query: { id },
      method: "DELETE",
    });
    toast.add({
      title: "User Deleted",
      description: "User has been deleted",
      timeout: 5000,
    });
    emit("refresh");
  } catch (error) {
    toast.add({
      title: "Error",
      description: "User couldn't be deleted",
      timeout: 5000,
    });
  }
}

</script>

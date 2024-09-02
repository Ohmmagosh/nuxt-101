<template>
  <tr class="text-center">
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.age }}</td>
    <td>
      <button class="btn btn-danger" @click="deleteUser">
        Delete
      </button>
    </td>
  </tr>
</template>
<script setup lang="ts">
import type { TUser } from "~/types/user-type";
import { defineProps } from "vue";

const props = defineProps<{
  user: TUser;
}>();

const emit = defineEmits<{
  (deleteUser: "deleteUser", id: string): void;
}>();

const deleteUser = () => {
  emit("deleteUser", props.user._id);
};
</script>

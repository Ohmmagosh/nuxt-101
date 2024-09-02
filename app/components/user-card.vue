<template>
  <div class="p-2">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h2>{{ user.username }}</h2>
          <button class="btn btn-danger" @click="deleteUser" >Delete</button>
        </div>
      </div>
      <div class="card-body">
        <p>email: {{ user.email }}</p>
        <p>age: {{ user.age }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TUser } from "~/types/user-type";
import { defineProps } from "vue";

const props = defineProps<{
  user: TUser;
}>();


const emit = defineEmits<{
  (deleteUser:'deleteUser', id: string): void;
}>();

const deleteUser = () => {
  emit('deleteUser', props.user._id);
};
</script>

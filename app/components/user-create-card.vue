<template>
  <div class="p-2">
    <div class="card">
      <form @submit.prevent="createUser" class="p-2 d-flex flex-column gap-3">
        <div class="d-flex justify-content-between gap-2">
          <div class="form-group w-50">
            <label for="username">Username</label>
            <input
              class="form-control"
              type="text"
              v-model="user.username"
              placeholder="username"
            />
          </div>
          <div class="form-group w-50">
            <label for="email">Email</label>
            <input
              class="form-control"
              type="email"
              v-model="user.email"
              placeholder="email"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input
            class="form-control"
            min="0"
            type="number"
            v-model="user.age"
            placeholder="age"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { TUser } from "~/types/user-type";

const emit = defineEmits<{
  (create: "createUser", user: TUser): void;
}>();

const user = ref<TUser>({
  _id: "",
  username: "",
  email: "",
  age: 0,
});

const createUser = () => {
  emit("createUser", user.value);
};
</script>

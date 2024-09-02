<template>
  <div class="container">
    <h1 class="text-center">User dashboard</h1>
    <user-create-card @create-user="createUser" />
    <!-- <div v-if="pending"></div> -->
    <p v-if="status == 'pending'">loading...</p>
    <user-card v-else v-for="user in data" :key="user._id" :user="user" @delete-user="deleteUser" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { TUser } from "~/types/user-type";

const { data, error, status, refresh, clear} = await useFetch<TUser[]>(`${import.meta.env.VITE_API_URL}/users`, {
  method: "GET",
});

const deleteUser = async (userId: string) => {
  try {
    const data = await $fetch(
      `${import.meta.env.VITE_API_URL}/users/delete/`, {
        params: {
          id: userId,
        },
        method: "DELETE",
      }
    );
    refresh();
  } catch (error) {
    console.error("Error : ", error);
  }
};

const createUser = async (user: TUser) => {
  try {
    const data = await $fetch(
      `${import.meta.env.VITE_API_URL}/users/create/`, {
        method: "POST",
        body: JSON.stringify(user),
      }
    );
    refresh();
  } catch (error) {
    console.error("Error : ", error);
  }
};
</script>

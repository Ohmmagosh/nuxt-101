<template>
  <div class="container">
    <h1 class="text-center p-4">User Management</h1>
    <user-create-card @create-user="createUser" />
    <p v-if="status == 'pending'">loading...</p>
    <p v-else-if="status == 'error'">Error: {{ error }}</p>
    <table class="table table-primary table-hover rounded">
      <thead>
        <tr>
          <th class="text-center" scope="col">Username</th>
          <th class="text-center" scope="col">Email</th>
          <th class="text-center" scope="col">Age</th>
          <th class="text-center" scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <user-table
          v-for="user in data"
          :key="user._id"
          :user="user"
          @delete-user="deleteUser"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TUser } from "~/types/user-type";

const { data, error, status, refresh, clear } = await useFetch<TUser[]>(
  `${import.meta.env.VITE_API_URL}/users`,
  {
    method: "GET",
  }
);

const deleteUser = async (userId: string) => {
  try {
    const data = await $fetch(`${import.meta.env.VITE_API_URL}/users/delete/`, {
      params: {
        id: userId,
      },
      method: "DELETE",
    });
    refresh();
  } catch (error) {
    console.error("Error : ", error);
  }
};

const createUser = async (user: TUser) => {
  try {
    const data = await $fetch(`${import.meta.env.VITE_API_URL}/users/create/`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    refresh();
    console.log(data);
  } catch (error) {
    console.error("Error : ", error);
  }
};
</script>

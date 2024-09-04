<template>
  <div>   
    <UContainer class="space-y-6 mb-16">    
      <h1 class="text-center p-4 text-2xl">User Management</h1>
      <UserCreateCard @refresh-user="refresh"/>
      <UserTable class="mt-2" :users="data" @refresh="refresh"/>
    </UContainer>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import type { TUser } from "~/types/user-type";
useHead({
  title: "User Management",
  meta: [
    {
      name: "description",
      content: "User Management",
    },
  ],
});

const { data, error, status, refresh, clear } = await useFetch<TUser[]>(
  `${import.meta.env.VITE_API_URL}/users`,
  {
    method: "GET",
  }
);


</script>

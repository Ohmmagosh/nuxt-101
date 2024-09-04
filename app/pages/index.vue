<template>
  <div>   
    <UContainer class="space-y-6">    
      <h1 class="text-center p-4 text-2xl">User Management</h1>
      <UserCreateCard @refresh-user="refresh"/>
      <UserTable class="mt-2" :users="data"/>
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

// const deleteUser = async (userId: string) => {
//   try {
//     const data = await $fetch(`${import.meta.env.VITE_API_URL}/users/delete/`, {
//       params: {
//         id: userId,
//       },
//       method: "DELETE",
//     });
//     refresh();
//   } catch (error) {
//     console.error("Error : ", error);
//   }
// };



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

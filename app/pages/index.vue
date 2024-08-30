<template>
  <div class="container">
    <h1>User list</h1>
     <card v-for="user in users" :key="user._id" :user="user" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import type  { TUser }  from '~/types/user-type'


const users: TUser[] = ref<TUser[]>([])

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
    const data = await response.data
    users.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => fetchUsers())






</script>

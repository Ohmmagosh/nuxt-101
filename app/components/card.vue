<template>
    <div class="card">
        <div class="card-header">
        <h2>{{ user.username }}</h2>
        </div>
        <div class="card-body">
        <p>{{ user.email }}</p>
        <p>{{ user.phone }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { TUser } from '~/types/user-type';
import { defineProps } from 'vue';
const props = defineProps<{
    user: TUser;
}>();
</script>
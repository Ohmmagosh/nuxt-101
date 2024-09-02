<template>

    <h1>hello user {{ route.params.id }}</h1>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

console.log(route.params) 






</script>
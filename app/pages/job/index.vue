<template>
    <div class="container">
        <h1 class="text-center p-4">job management</h1>
        <JobCreateCard @create-job="createJob" />
    </div>
</template>
<script setup lang="ts">
// import { defineEmits } from "vue";

useHead({
    title: "Job Management",
    meta: [
        {
            name: "description",
            content: "Job Management",
        },
    ],
});

const createJob = () => {
    console.log("create job");
};

</script>
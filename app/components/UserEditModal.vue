<template>
  <div>
    <UModal :model-value="open" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ userInfomation.username }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="$emit('closeModal')"
            />
          </div>
        </template>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit.prevent="onSubmit"
        >
          <UFormGroup label="Username" name="username">
            <UInput v-model="state.username" type="text" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" type="email" />
          </UFormGroup>
          <UFormGroup label="Age" name="age">
            <UInput v-model="state.age" type="number" />
          </UFormGroup>
          <div class="flex justify-between space-x-2">
            <UButton
              variant="solid"
              type="button"
              color="red"
              @click="$emit('closeModal')"
              >Close</UButton
            >
            <UButton
              type="submit"
              variant="solid"
              @click="onSubmit"
              color="green"
              >Confirm</UButton
            >
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
<script setup lang="ts">
import type { TUser } from "~/types/user-type";
import { defineProps, defineEmits, reactive, watch } from "vue";
const toast = useToast();
import Joi from "joi";

const props = defineProps<{
  open: boolean;
  userInfomation: TUser;
}>();

const emit = defineEmits<{
  (closeModal: "closeModal"): void;
  (refresh: "refresh"): void;
}>();

const state = reactive<TUser>({
  _id: "",
  username: "",
  email: "",
  age: 0,
});

const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  age: Joi.number().required(),
});

watch(
  () => props.userInfomation,
  (value) => {
    state._id = value._id;
    state.username = value.username;
    state.email = value.email;
    state.age = value.age;
  }
);

async function onSubmit() {
  if (
    state.username == props.userInfomation.username &&
    state.email == props.userInfomation.email &&
    state.age == props.userInfomation.age
  )
    return;

  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/users/update`, {
      query: { id: state._id },
      method: 'PATCH',
      body: state,
    });
    toast.add({
      title: "User Updated",
      description: "User has been updated successfully",
      timeout: 5000,
    });
    emit("refresh");
    emit("closeModal");
  } catch {
    toast.add({
      title: "Error: cannot update user",
      description: "An error occurred",
      timeout: 5000,
    });
    emit("closeModal")
    return;
  }
}
</script>

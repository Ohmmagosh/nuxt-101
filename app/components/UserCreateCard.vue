<template>
  <UCard >
    <UForm :schema="schema" :state="user" class="space-y-4" @submit.prevent="onSubmit">
      <UFormGroup label="Username" name="username">
        <UInput v-model="user.username" type="text" />
      </UFormGroup>
      <UFormGroup label="Email" name="email">
        <UInput v-model="user.email" type="email"/>
      </UFormGroup>
      <UFormGroup label="Age" name="age">
        <UInput v-model="user.age" type="number"/>
      </UFormGroup>
      <div class="flex justify-end">
        <UButton type="submit">
          Submit
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import Joi from 'joi'
import { defineEmits } from 'vue';
const toast = useToast()



const emit = defineEmits<{
  (refreshUser: 'refreshUser'): void
}>();

const schema = Joi.object({
  username: Joi.string()
  .required(),
  email: Joi.string().required(),
  age: Joi.number().required(),
})

export type TCreateUser = {
  username: string
  email: string
  age: number
}

const user = reactive<TCreateUser>({
  username: "g",
  email: "g@g.com",
  age: 122,
})



async function onSubmit() {
  try {
    await $fetch(`${import.meta.env.VITE_API_URL}/users/create`, {
      method: "POST",
      body: user,
    })
    toast.add({
      title: 'User Created',
      description: 'User has been created successfully',
      timeout: 5000,
    })
    emit('refreshUser')
  }
  catch(err) {
    console.log('fuckkkkkk')
    toast.add({
      title: `Error: connot create user`,
      description: 'An error occurred',
      timeout: 5000,
    })
  }



  
}
</script>

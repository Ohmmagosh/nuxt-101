<template>
  <!-- Button trigger modal -->
  <b-button
   button="outline"
   toggle="modal"
   padding="0"
   target="#exampleModalCenter"
  >
   {{ label }}
  </b-button>
  
  <!-- Modal -->
  <Modal id="exampleModalCenter" :keyboard="false">
   <ModalDialog centered>
    <ModalContent>
     <ModalHeader>
      <ModalTitle>{{ user.username }}</ModalTitle>
      <CloseButton dismiss="modal" />
     </ModalHeader>
     <ModalBody>
      <form @submit.prevent="onSubmit" class="p-2 d-flex flex-column gap-3">
        <div class="d-flex justify-content-between gap-2">
          <div class="form-group w-50">
            <BFormLabel for="email">Email</BFormLabel>
            <BFormInput
              class="form-control"
              type="email"
              v-model="user.email"
              placeholder="email"
            />
          </div>
        </div>
        <div class="form-group">
          <BFormLabel for="age">Age</BFormLabel>
          <input
            class="form-control"
            min="0"
            type="number"
            v-model="user.age"
            placeholder="age"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>
    </ModalBody>
     <ModalFooter>
      <b-button
       button="secondary"
       dismiss="modal"
      >
       Close
      </b-button>
      <b-button button="primary">
       Save changes
      </b-button>
     </ModalFooter>
    </ModalContent>
   </ModalDialog>
  </Modal>
 </template>
<script setup lang="ts">
import { defineProps } from "vue";
import type { TUser } from "../types/user-type";
import Joi   from "joi";
// import type { FormError, FormSubmitEvent } from '#ui/types'
const props = defineProps<{
  label: string;
  user: TUser;
}>();

type TEditUser = {
  email: string;
  age: number;
};

const state = reactive<TEditUser>({
  email: props.user.email,
  age: props.user.age,
})
const JEditSchema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().required(),
});

async function onSubmit(user: any) {

  const { error, value } = JEditSchema.validate(state, {
    abortEarly: false,
  });
  if (error) {
    return;
  }
  console.log(value);
}
</script>

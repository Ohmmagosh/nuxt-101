<template>
  <UCard>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UFormGroup label="Description" name="description">
        <UTextarea v-model="state.description" />
      </UFormGroup>
      <UFormGroup label="Start At" name="start_at">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
          icon="i-heroicons-calendar-days-20-solid"
          :label="format(state.start_at, 'd MMM, yyy')"
          />
          <template #panel="{ close }">
            <DatePicker v-model="state.start_at" is-required @close="close" />
          </template>
        </UPopover>
      </UFormGroup>
      <UFormGroup label="End At" name="end_at">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
          icon="i-heroicons-calendar-days-20-solid"
          :label="format(state.end_at, 'd MMM, yyy')"
          />
          <template #panel="{ close }">
            <DatePicker v-model="state.end_at" is-required @close="close" />
          </template>
        </UPopover>
      </UFormGroup>
      <template #footer>
        <div class="flex justify-end">
          <UButton type="submit" color="black">Save</UButton>
        </div>
      </template>
    </UForm>
  </UCard>
  
</template>
<script setup lang="ts">
import Joi from "joi";
import { format } from "date-fns";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  start_at: Joi.date().required(),
  end_at: Joi.date().required(),
});

const state = reactive({
  name: "",
  description: "",
  start_at: new Date(),
  end_at: new Date(),
});

async function onSubmit() {
  console.log("submit", state);
}
</script>

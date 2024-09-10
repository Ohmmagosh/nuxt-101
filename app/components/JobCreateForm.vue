<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <div class="py-2 flex space-x-8 items-center">
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
    </div>
    <div class="flex gap-2 py-2">
      <UBadge v-for="user in state.user_id" color="amber" >
        {{ user.label }}
      </UBadge>
    </div>
    <UFormGroup label="Assign" name="user_id">
      <USelectMenu
        class="w-1/2"
        v-model="state.user_id"
        :options="data!"
        placeholder="Select a person"
        searchable
        searchable-placeholder="Search by name"
        option-attribute="label"
        by="key"
        multiple
        :search-attributes="['label']"
      >
        <template #option="{ option: person }">
          <span class="truncate">{{ person.label }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>
    <div class="flex justify-end">
      <UButton type="submit" color="green">Save</UButton>
    </div>
  </UForm>
</template>
<script setup lang="ts">
import Joi from "joi";
import { format } from "date-fns";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";
import type { TUser } from "~/types/user-type";

type TUserOption = {
  label: string;
  key: string;
};

const { data, error } = await useFetch(
  `${import.meta.env.VITE_API_URL}/users`,
  {
    transform(data: TUser[]): TUserOption[] {
      return data.map((user: TUser) => ({
        label: user.username,
        key: user._id,
      }));
    },
  }
);

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  start_at: Joi.date().required(),
  end_at: Joi.date().required(),
  user_id: Joi.array().items(Joi.object({
    label: Joi.string().required(),
    key: Joi.string().required(),
  })).required(),
});

const state = reactive({
  name: "",
  description: "",
  start_at: new Date(),
  end_at: new Date(),
  user_id: [] as TUserOption[],
});

async function onSubmit() {
  console.log("submit", state);
}
</script>

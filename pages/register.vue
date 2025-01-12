<template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div class="center">
    <form @submit.prevent="submitForm" method="post" class="w-[400px] space-y-6">
      <h2 class="text-3xl font-semibold text-white text-left mb-6">Register</h2>

      <div class="flex flex-col space-y-2">
        <label for="name" class="text-white font-medium text-lg">Name:</label>
        <input class="inputCss" type="text" name="name" id="name" v-model="name" required
          placeholder="Enter your name" />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="email" class="text-white font-medium text-lg">Email:</label>
        <input class="inputCss" type="email" name="email" id="email" v-model="email" required
          placeholder="Enter your email" />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="password" class="text-white font-medium text-lg">Password:</label>
        <input class="inputCss" type="password" name="password" id="password" v-model="password" required
          @blur="checkPasswords" placeholder="Enter your password" />
      </div>

      <div class="flex flex-col space-y-2">
        <label for="confirm-password" class="text-white font-medium text-lg">Confirm Password:</label>
        <input class="inputCss" type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword"
          @blur="checkPasswords" required placeholder="Confirm your password" />

        <p v-if="error" class="text-purple-800 text-lg font-semibold"> {{ error }} </p>
      </div>

      <button class="buttonCss w-[350px] h-[50px]" type="submit">
        Submit
      </button>

      <p class="text-white">Already have an account? Click <a href="/login" class="text-blue-400">here</a> to log in.
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useRegisterForm } from '@/composables/useRegister';

const {
  name,
  email,
  password,
  confirmPassword,
  error,
  submitForm,
  checkPasswords
} = useRegisterForm();

</script>
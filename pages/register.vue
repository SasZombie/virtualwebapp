<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="submitForm" method="post">
      <div>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" v-model="name" required>
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" v-model="email" required>
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" v-model="password" required>
      </div>

      <div>
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword"
          @blur="checkPasswords" required>

        <p v-if="error">{{ error }}</p>
      </div>

      <button type="submit">Submit</button>
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
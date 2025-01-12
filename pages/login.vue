<template>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="center">
        <form @submit.prevent="submitForm" method="post" class="w-[400px] space-y-6">
            <h2 class="text-3xl font-semibold text-white text-left mb-6">Log In</h2>

            <div class="flex flex-col space-y-2">
                <label for="email" class="text-white font-medium text-lg">Email:</label>
                <input class="inputCss" type="email" name="email" id="email" v-model="email"
                    placeholder="Enter your email" />
            </div>

            <div class="flex flex-col space-y-2">
                <label for="password" class="text-white text-lg font-medium">Password:</label>
                <input class="inputCss" type="password" name="password" id="password" v-model="password"
                    placeholder="Enter your password" />
            </div>

            <p v-if="error" class="text-purple-800 text-lg font-semibold"> {{ error }} </p>

            <button class="buttonCss w-[350px] h-[50px]" type="submit">
                Log In
            </button>
            <p>Dont have an account? Click  <a href="/register"  class="text-blue-400" >here</a>.</p>

        </form>
    </div>

</template>

<script lang="ts" setup>

import { useLogin } from '@/composables/useLogin';


const { email, password, submitForm, error } = useLogin();

</script>

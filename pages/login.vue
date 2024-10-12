<template>

    <div>
        <form @submit.prevent="submitForm" method="post">
            <div>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" v-model="email"></input>
            </div>

            <div>
                <label for="email">Password:</label>
                <input type="password" name="password" id="password" v-model="password"></input>
            </div>
            <p v-if="error"> {{ error }}</p>

            <button type="submit">LogIn</button>


        </form>
    </div>
</template>

<script lang="ts" setup>

import { useLogin }  from '@/composables/useLogin'; 


const { email, password, submitForm, error } = useLogin(); 

</script>

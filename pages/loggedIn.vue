<template>
    <div>
        Logged In :D
        <br>

        Nume = {{ user?.name }}
        <br>
        Email = {{ user?.email }}
        <br>
        Virtual Machines available = {{ user?.virtualMachinesIDs }}
        <br>
        <button @click="logoutButton">LogOut</button>
    </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';
import { logout } from '@/composables/useLogin'

    definePageMeta({
        middleware: 'auth'
    });

    const user = useState<User | null>("user");

    const logoutButton = () =>{
        logout();
    }
</script>


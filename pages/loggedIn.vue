<template>
    <div>
        Logged In :D
        <br>

        Nume = {{ user?.name }}
        <br>
        Email = {{ user?.email }}
        <br>
        Virtual Machines available = {{ user?.virtualMachinesNumber }}
        <br>
        <button @click="createNewVm(VmType.Debian)">Add virtual Machine Debian</button>
        <button @click="createNewVm(VmType.Ubuntu)">Add virtual Machine Ubuntu</button>
        <br>
        <ul>
            <li v-for="(vm, index) in user?.virtualMachines" :key="index">
                {{ vm }}
                <button @click="deleteVm(index)"> Delete </button>
            </li>
        </ul>
        <button @click="logout">LogOut</button>

        <p v-if="error">Erorr creating vm</p>
    </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';
import { VmType } from '@/types/vms';

definePageMeta({
    middleware: 'auth'
});

const userCookie = useCookie<User | null>("user");
const user = useState<User | null>("user", () => userCookie.value || null);


watch(userCookie, (newValue) => {
    user.value = newValue;
})

const { error, createNewVm, deleteVm } = useVm();

</script>

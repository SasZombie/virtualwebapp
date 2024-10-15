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
                <button @click="redirect(vm)">Access it</button>
                <button @click="deleteVm(vm)"> Delete </button>
            </li>
        </ul>
        <button @click="logout">LogOut</button>

        <p v-if="error"> {{ error }}</p>
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
const router = useRouter();

const redirect = (id: number) => {
    if (user.value) {
        user.value.selectedVm = id.toString();
    }
    runVm(id);
    router.push("/virtualMachine")
}

watch(userCookie, (newValue) => {
    user.value = newValue;
})

const { error, createNewVm, deleteVm, runVm } = useVm();

</script>

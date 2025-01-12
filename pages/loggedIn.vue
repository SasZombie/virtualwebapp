<template>
    <div>
        Logged In :D
        <br>

        Name = {{ user?.name }}
        <br>
        Email = {{ user?.email }}
        <br>
        Virtual Machines available = {{ user?.virtualMachinesNumber }}
        <br>
        <button class="buttonCss" @click="toggleConfigTable(VmType.Debian)">Add virtual Machine Debian</button>
        <br>
        <button class="buttonCss" @click="toggleConfigTable(VmType.Ubuntu)">Add virtual Machine Ubuntu</button>
        <br>

        <div v-if="showConfigTable" id="configTable" style="margin-top: 10px;">
             <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Specification</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>RAM (GB)</td>
                        <td><input type="number" placeholder="e.g., 16"></td>
                    </tr>
                    <tr>
                        <td>CPUs</td>
                        <td><input type="number" placeholder="e.g., 4"></td>
                    </tr>
                    <tr>
                        <td>Memory (GB)</td>
                        <td><input type="number" placeholder="e.g., 256"></td>
                    </tr>
                </tbody>
            </table>
            <button class="buttonCss" @click="createNewVm(chosenType), toggleConfigTable(VmType.Debian)">Create</button>
        </div>

        <ul>
            <li v-for="(vm, index) in user?.virtualMachines" :key="index">
                {{ vm }}
                <button class="buttonCss" @click="redirect(vm)">Access it</button>
                <button class="buttonCss" @click="deleteVm(vm)"> Delete </button>
            </li>
        </ul>

        <p v-if="error"> {{ error }}</p>

        <button class="buttonCss" @click="logout">LogOut</button>
    </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';
import { VmType } from '@/types/vms';

definePageMeta({
    middleware: 'auth'
});

const showConfigTable = ref(false);
let chosenType: VmType = VmType.Debian;

const toggleConfigTable = (type: VmType) => {
    showConfigTable.value = !showConfigTable.value;
    chosenType = type;
};

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

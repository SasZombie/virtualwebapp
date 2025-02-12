<template>
    <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="mb-6">
            <h2 class="text-3xl font-semibold text-white text-center mb-4">Logged In</h2>
            <p class="text-lg text-white mt-2">Name: <span class="font-medium">{{ user?.name }}</span></p>
            <p class="text-lg text-white">Email: <span class="font-medium">{{ user?.email }}</span></p>
            <p class="text-lg text-white">Virtual Machines Available: <span class="font-medium">{{
                user?.virtualMachinesNumber }}</span></p>
        </div>

        <div class="mb-6">
            <button class="buttonCss w-full mb-4" @click="toggleConfigTable(VmType.Debian)">Add Virtual Machine
                Debian</button>
            <button class="buttonCss w-full mb-4" @click="toggleConfigTable(VmType.Ubuntu)">Add Virtual Machine
                Ubuntu</button>
        </div>

        <div v-if="showConfigTable" id="configTable" class="mb-6">
            <h3 class="text-2xl font-semibold text-white mb-4">Configure Your Virtual Machine</h3>
            <table class="table-auto w-full mb-4 bg-transparent">
                <thead>
                    <tr>
                        <th class="px-4 py-2 text-left text-white">Component</th>
                        <th class="px-4 py-2 text-left text-white">Specification</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-2 text-white">RAM (GB)</td>
                        <td class="px-4 py-2"><input type="number" class="inputCss" placeholder="e.g., 16"></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2 text-white">CPUs</td>
                        <td class="px-4 py-2"><input type="number" class="inputCss" placeholder="e.g., 4"></td>
                    </tr>
                    <tr>
                        <td class="px-4 py-2 text-white">Memory (GB)</td>
                        <td class="px-4 py-2"><input type="number" class="inputCss" placeholder="e.g., 256"></td>
                    </tr>
                </tbody>
            </table>
            <button class="buttonCss w-full"
                @click="createNewVm(chosenType), toggleConfigTable(VmType.Debian)">Create</button>
        </div>

        <ul class="space-y-4">
            <li v-for="(vm, index) in user?.virtualMachines" :key="index"
                class="flex items-center justify-between bg-gray-400 p-4 rounded-lg shadow-md border border-white/30">
                <span class="text-lg font-medium text-white">{{ vm }}</span>
                <div class="flex space-x-4">
                    <button class="buttonCss w-[100px]" @click="redirect(vm)">Access it</button>
                    <button class="buttonCss w-[100px] bg-red-500 hover:bg-red-600" @click="deleteVm(vm)">Delete
                        it</button>
                </div>
            </li>
        </ul>

        <p v-if="error" class="text-purple-900 text-lg font-semibold mt-4">{{ error }}</p>

        <div class="mt-6">
            <button class="buttonCss w-full bg-gray-800 hover:bg-gray-900" @click="logout">Log Out</button>
        </div>
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

watch(
    userCookie,
    (newValue) => {
        user.value = newValue;
    },
    { deep: true }
);

onBeforeRouteLeave((to, from) => {

    if (to.name === "login") {
        router.push("/")
    }
})

const { error, createNewVm, deleteVm, runVm } = useVm();

</script>

export interface User{
    id: string,
    email: string,
    name: string,
    virtualMachinesNumber: number,
    virtualMachines: number[]
    selectedVm: string
}
export enum VmType{
    Debian = "DEBIAN",
    Ubuntu = "UBUNTU"
}

//PlaceHolder because we do not have memory for each vm type with all configs :)
export interface Vms{
    type: VmType,
    id: string,
    ram: number,
    cores: number
}
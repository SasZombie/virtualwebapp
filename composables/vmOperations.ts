import type { VmType } from "@/types/vms";

export const useVm = () => {
  const error = ref("");

  const createNewVm = async (type: VmType) => {
    try {
      const response = await fetch("/api/createVm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
        }),
      });
      if (!response.ok) {
        error.value = "Could not add virtual Machine";
      } else {
        error.value = "";
      }
    } catch (e) {
      console.log("Internal Server Error");
    }

  };

  const deleteVm = (index: number) => {
    console.log(index);
  };

  return {
    error, createNewVm, deleteVm
  };
};

import type { VmType } from "@/types/vms";

export const useVm = () => {
  const error = ref("");

  const createNewVm = async (type: VmType) => {
    error.value = "Creating"
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

  const deleteVm = async (id: number) => {
    try {
      const response = await fetch("/api/deleteVm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      if (!response.ok) {
        error.value = "Could not delete virtual Machine";
      } else {
        error.value = "";
      }
    } catch (e) {
      console.log("Internal Server Error");
    }

  };


  const runVm = async (id: number) => {
    try {
      const response = await fetch("/api/runVm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      if (!response.ok) {
        error.value = "Could not delete virtual Machine";
      } else {
        error.value = "";
      }
    } catch (e) {
      console.log("Internal Server Error");
    }
  }


  const exitVm = async (id: number) => {
    try {
      const response = await fetch("/api/exitVm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      if (!response.ok) {
        error.value = "Could not delete virtual Machine";
      } else {
        error.value = "";
      }
    } catch (e) {
      console.log("Internal Server Error");
    }
  }

  return {
    error, createNewVm, deleteVm, runVm, exitVm
  };
};

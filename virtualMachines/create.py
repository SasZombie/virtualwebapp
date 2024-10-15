import sys
import subprocess

def clone_virtualbox_vm(original_vm_name:str, new_vm_name:str, base_folder:str)->None:
    try:
        command = [
            "VBoxManage", "clonevm", original_vm_name, 
            "--name", new_vm_name,  
            "--basefolder", base_folder,  
            "--register" 
        ]

        result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        print(f"VM '{original_vm_name}' cloned successfully as '{new_vm_name}' at '{base_folder}'")
        print(result.stdout.decode())
    except subprocess.CalledProcessError as e:
        print(f"Error occurred during cloning: {e.stderr.decode()}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


def main()->None:
    
    acceptableVms = ('DEBIAN', 'UBUNTU')
    
    if len(sys.argv) < 2:
        raise ValueError("Not enough args")
    else:
        vm_type = sys.argv[1];
        if vm_type in acceptableVms:
            if vm_type == "DEBIAN":
                clone_virtualbox_vm("DebianOriginal", sys.argv[2] + sys.argv[3], "/home/sas/Coding/virtualwebapp/virtualMachines/Debian/")
            else:
                clone_virtualbox_vm("UbuntuOriginal", sys.argv[2] + sys.argv[3], "/home/sas/Coding/virtualwebapp/virtualMachines/Ubuntu/")
        else:
            raise ValueError("We do not accept this vm")



if __name__ == "__main__":
    main()
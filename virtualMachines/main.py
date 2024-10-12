import sys
import subprocess


def start_virtualbox_vm(vm_name:str)->None:
    try:
        
        command = ["VBoxManage", "startvm", vm_name, "--type", "gui"]
        
        result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("Vm " + vm_name + " started sucesfull!")
        print(result.stdout.decode())
        
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e.stderr.decode()}")
    except FileNotFoundError:
        print("VBoxManage command not found. Make sure VirtualBox is installed and VBoxManage is in your PATH.")

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
        if sys.argv[1] in acceptableVms:
            print("Proceding")
        else:
            raise ValueError("We do not accept this vm")
    # clone_virtualbox_vm("DebianOriginal", "DebianSandu", "/home/sas/Coding/virtualwebapp/virtualMachines/Debian/")
    # start_virtualbox_vm("DebianSandu")



if __name__ == "__main__":
    main()
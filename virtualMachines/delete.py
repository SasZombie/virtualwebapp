import sys
import subprocess

def delete_virtualbox_vm(vm_name: str):
    try:

        subprocess.run(["VBoxManage", "unregistervm", vm_name, "--delete"], check=True)
        print(f"VirtualBox VM '{vm_name}' deleted successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: Failed to delete VM '{vm_name}'. Error: {e}")
    except FileNotFoundError:
        print("VBoxManage not found. Make sure VirtualBox is installed and VBoxManage is in your system's PATH.")


def main()->None:
    
    
    if len(sys.argv) < 2:
        raise ValueError("Not enough args")
    else:
        delete_virtualbox_vm(sys.argv[2] + sys.argv[1])


if __name__ == "__main__":
    main()
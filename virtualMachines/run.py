import subprocess
import sys

def get_window_id_by_name(window_name):
    try:
        result = subprocess.run(['wmctrl', '-l'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        if result.returncode != 0:
            print("Error running wmctrl:", result.stderr)
            return None


        for line in result.stdout.splitlines():
            if window_name.lower() in line.lower():
                window_id = line.split()[0]
                return window_id

        print(f"Window with name '{window_name}' not found.")
        return None

    except Exception as e:
        print("An error occurred:", e)
        return None

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
        
        
def main()->None:
        
    if len(sys.argv) < 2:
        raise ValueError("Not enough args")
    else:
        start_virtualbox_vm(sys.argv[2] + sys.argv[1]);
        window_name = sys.argv[2] + sys.argv[1] + " [Running] - Oracle VirtualBox"
        window_id = get_window_id_by_name(window_name)
        if window_id:
            try:
                execute_server = ["x11vnc", "-display", ":0", "-id", window_id, "-forever", "-usepw", "-noxdamage", "-noxfixes", "-noxcomposite"]
                subprocess.run(execute_server, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            except subprocess.CalledProcessError as e:
                print(e.stderr.decode());
                

if __name__ == "__main__":
    main()
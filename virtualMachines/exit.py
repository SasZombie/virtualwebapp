import subprocess
import sys
import os
import signal

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
    

    
def get_pid_from_window(window_id):
    try:
        output = subprocess.check_output(["xprop", "-id", str(window_id), "_NET_WM_PID"])
        pid = int(output.decode().strip().split()[-1])
        return pid
    except Exception as e:
        print(f"Error: {e}")
        return None
    
    
def main()->None:
        
    if len(sys.argv) < 2:
        raise ValueError("Not enough args")
    else:
        window_name = sys.argv[1] + sys.argv[2] + " [Running] - Oracle VirtualBox"
        os.kill(get_pid_from_window(get_window_id_by_name(window_name)), signal.SIGTERM)
    
                

if __name__ == "__main__":
    main()
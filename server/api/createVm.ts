import { spawn } from "child_process";
import { Vms } from "@/types/vms";
import { redis } from "./common";
import { User } from "@/types/user";

export default defineEventHandler(async (event) => {
  const body: Vms = await readBody(event);

  const userCookie = getCookie(event, "user");

  if (!userCookie) {
    return;
  }

  let user: User = JSON.parse(userCookie);

  const { type } = body;
  
  let idVm = 1;
  
  if(user.virtualMachines.length > 0)
    idVm = Number(Number(Math.max(...user.virtualMachines)) + 1)

  const runPython = () => {
    return new Promise<void>((resolve, reject) => {
      const pythonProcess = spawn("python3", [
        "virtualMachines/create.py",
        type,
        user.id,
        idVm.toString(),
      ]);

      pythonProcess.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error in PYTHON: ${data.toString()}`);
      });

      pythonProcess.on("close", async (code)  => {
        if (code === 0) {
          let key = user.id;

          user.virtualMachinesNumber = Number(user.virtualMachinesNumber) + 1;
          
          redis.hset(
            user.email,
            "virtualMachineNumber",
            user.virtualMachinesNumber
          );
          redis.lpush(key, idVm, (err) => {
            if (err) {
              reject(err);
            } else {
              user.virtualMachines.push(idVm);
              setCookie(event, "user", JSON.stringify(user));
              resolve();
            }
          });
        }
      });
    });
  };

  try {
    await runPython();
    setResponseStatus(event, 201, "Ok");
    return "Ok";
  } catch (e) {
    setResponseStatus(event, 501, "Inernal Server Error");
    console.error("Error in python script\n" + e);
  }
});

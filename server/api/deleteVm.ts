import { spawn } from "child_process";
import { redis } from "./common";
import { User } from "@/types/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const userCookie = getCookie(event, "user");

  if (!userCookie) {
    return;
  }

  let user: User = JSON.parse(userCookie);

  const runPython = () => {
    return new Promise<void>((resolve, reject) => {
      const pythonProcess = spawn("python3", [
        "virtualMachines/delete.py",
        body.id,
        user.id,
      ]);

      pythonProcess.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error in PYTHON: ${data.toString()}`);
      });

      pythonProcess.on("close", async (code) => {
        if (code === 0) {
          let key = user.id;

          user.virtualMachinesNumber = Number(user.virtualMachinesNumber) - 1;

          redis.hset(
            user.email,
            "virtualMachineNumber",
            user.virtualMachinesNumber
          );

          redis.lrem(key, 0, body.id, (err) => {
            if (err) {
              reject(err);
            } else {
              user.virtualMachines = user.virtualMachines.filter( elem => elem != body.id);
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

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
        "virtualMachines/exit.py",
        user.id,
        body.id,
      ]);

      pythonProcess.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error in PYTHON: ${data.toString()}`);
      });

      pythonProcess.on("close", async (code) => {
        console.log("Finished Process");
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

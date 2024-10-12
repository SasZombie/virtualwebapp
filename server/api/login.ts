import { defineEventHandler, readBody } from "h3";
import { hashPassword } from "~/typscript/utils";

import { FormBody, redis } from "./common";


export default defineEventHandler(async (event) => {
  const body: FormBody = await readBody(event);

  const { email, password } = body;

  const exists = await redis.exists(email);

  if (!exists) {
   setResponseStatus(event, 401, "Email doesn't exist!");
   return;
  }

  const value = await redis.hgetall(email);
  const machines = await redis.lrange(value.name+":virtualMachines", 0, -1);

  if(value.hashedPassword === hashPassword(password))
  {
    setResponseStatus(event, 202, "Logged in successfully");
    return{
      id: value.id,
      email: email,
      name: value.name,
      virtualMachineNumber: value.virtualMachineNumber,
      machines: machines
    };
  }

 setResponseStatus(event, 401, "Incorrect Password");

});

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

  if(value.hashedPassword === hashPassword(password))
  {
    setResponseStatus(event, 202, "Logged in successfully");
    return{
      email: email,
      name: value.name,
      virtualMachinesIDs: value.virtualMachinesIDs
    };
  }

 setResponseStatus(event, 401, "Incorrect Password");

});

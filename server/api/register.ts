import { defineEventHandler, readBody } from "h3";
import { hashPassword } from "~/typscript/utils";

import { FormBody, redis } from "./common";

export default defineEventHandler(async (event) => {
  const body: FormBody = await readBody(event);

  const { name, email, password } = body;

  if (!name || !email || !password) {
    setResponseStatus(event, 400, "All fields are required");
    return;
  }

  const key = email;

  const exists = await redis.exists(key);

  if (exists !== 0) {
    setResponseStatus(event, 400, "This email already Exists")
    return;
  }

  try {
    const virtualMachinesIDs = "";
    const hashedPassword = hashPassword(password);
    await redis.hmset(key, { name, hashedPassword, virtualMachinesIDs });
    setResponseStatus(event, 201, "Registration complete!");
    return;
  } catch (error) {
    console.error("Error saving to Redis:", error);
    setResponseStatus(event, 500, "Cannot save to redis!");

  }
});

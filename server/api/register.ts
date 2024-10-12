import { defineEventHandler, readBody } from "h3";
import { hashPassword } from "@/typscript/utils";

import { FormBody, redis } from "./common";

function randomID(
  length: number,
  characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
): string {
  let result = "";

  const charLeng = characters.length;

  for (let i = 0; i < length; ++i) {
      const randomIndex = Math.floor(Math.random() * charLeng);
      result = result + characters.charAt(randomIndex);
  }

  return result;
}

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
    const hashedPassword = hashPassword(password);
    const virtualMachineNumber = 0
    const id = name + randomID(4);
    await redis.hmset(key, { name, hashedPassword, virtualMachineNumber, id });
    setResponseStatus(event, 201, "Registration complete!");
    return;
  } catch (error) {
    console.error("Error saving to Redis:", error);
    setResponseStatus(event, 500, "Cannot save to redis!");

  }
});

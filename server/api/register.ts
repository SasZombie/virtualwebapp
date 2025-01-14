import { defineEventHandler, readBody } from "h3";
import { hashPassword } from "@/typscript/utils";
import { GmailAddr, GmailPass } from "@/server/secret"

import { FormBody, redis } from "./common";
import nodemailer from 'nodemailer';

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

async function sendEmail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
          user: GmailAddr,       
          pass: GmailPass,       
      },
  });

  const mailOptions = {
      from: '"CompanyIRL" <your_email@gmail.com>', 
      to,                                         
      subject,                                    
      text,                                       
  };

  try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
  }
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
    const id = name + randomID(4) + ":virtualMachines";
    await redis.hmset(key, { name, hashedPassword, virtualMachineNumber, id });
    await sendEmail(email, 'Confirmation email', 'Confirmation email .');

    setResponseStatus(event, 201, "Registration complete!");
    return;
  } catch (error) {
    console.error("Error saving to Redis:", error);
    setResponseStatus(event, 500, "Cannot save to redis!");

  }
});

import Redis from "ioredis";

export const redis = new Redis();

export interface FormBody{
    name: string,
    email: string,
    password: string
}
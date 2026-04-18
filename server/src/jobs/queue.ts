import { Queue } from "bullmq";
import "dotenv/config";

const connection = {
  url: process.env.REDIS_URL,
};

export const emailQueue = new Queue("emailQueue", {
  connection: {
    host: new URL(process.env.REDIS_URL as string).hostname,
    port: parseInt(new URL(process.env.REDIS_URL as string).port),
    password: new URL(process.env.REDIS_URL as string).password,
    username: new URL(process.env.REDIS_URL as string).username,
  },
});

export const notificationQueue = new Queue("notificationQueue", {
  connection: {
    host: new URL(process.env.REDIS_URL as string).hostname,
    port: parseInt(new URL(process.env.REDIS_URL as string).port),
    password: new URL(process.env.REDIS_URL as string).password,
    username: new URL(process.env.REDIS_URL as string).username,
  },
});

console.log("Email & Notification Queues initialized");

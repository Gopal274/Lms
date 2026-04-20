import { Queue } from "bullmq";
import "dotenv/config";
import { redis } from "../config/redis";

export const emailQueue = new Queue("emailQueue", {
  connection: redis,
});

export const notificationQueue = new Queue("notificationQueue", {
  connection: redis,
});

console.log("Email & Notification Queues initialized");

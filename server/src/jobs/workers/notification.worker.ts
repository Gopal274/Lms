import { Worker } from "bullmq";
import { notificationProcessor } from "../processors/notification.processor";
import "dotenv/config";

const redisOptions = {
  host: new URL(process.env.REDIS_URL as string).hostname,
  port: parseInt(new URL(process.env.REDIS_URL as string).port),
  password: new URL(process.env.REDIS_URL as string).password,
  username: new URL(process.env.REDIS_URL as string).username,
};

export const notificationWorker = new Worker("notificationQueue", notificationProcessor, {
  connection: redisOptions,
});

notificationWorker.on("completed", (job) => {
  console.log(`Notification Job ${job.id} completed`);
});

notificationWorker.on("failed", (job, err) => {
  console.log(`Notification Job ${job?.id} failed: ${err.message}`);
});

console.log("Notification Worker started");

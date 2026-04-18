import { Worker } from "bullmq";
import { emailProcessor } from "../processors/email.processor";
import "dotenv/config";

const redisOptions = {
  host: new URL(process.env.REDIS_URL as string).hostname,
  port: parseInt(new URL(process.env.REDIS_URL as string).port),
  password: new URL(process.env.REDIS_URL as string).password,
  username: new URL(process.env.REDIS_URL as string).username,
};

export const emailWorker = new Worker("emailQueue", emailProcessor, {
  connection: redisOptions,
});

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed with error: ${err.message}`);
});

console.log("Email Worker started");

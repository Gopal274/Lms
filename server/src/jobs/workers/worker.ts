import { Worker } from "bullmq";
import { emailProcessor } from "../processors/email.processor";
import "dotenv/config";
import { redis } from "../../config/redis";

export const emailWorker = new Worker("emailQueue", emailProcessor, {
  connection: redis,
});

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed with error: ${err.message}`);
});

console.log("Email Worker started");

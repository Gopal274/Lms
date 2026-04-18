import { createAdapter } from "@socket.io/redis-adapter";
import { Redis } from "ioredis";
import type { Server as SocketIOServer } from "socket.io";
import "dotenv/config";

const pubClient = new Redis(process.env.REDIS_URL as string);
const subClient = pubClient.duplicate();

export const setupSocketAdapter = (io: SocketIOServer) => {
  io.adapter(createAdapter(pubClient, subClient));
  console.log("Socket.io Redis adapter setup successfully");
};

import {Redis} from "ioredis";
import "dotenv/config";

const redisClient =()=>{
  if(process.env.REDIS_URL){
  console.log("redis is connected with url",process.env.REDIS_URL);
  return process.env.REDIS_URL;
  }
  throw new Error("Redis URL is not defined in environment variables");
}

export const redis = new Redis(redisClient());

  

import express from "express";
import {
  createDoubt,
  getDoubts,
  getDoubtById,
  addDoubtReply,
  resolveDoubt,
} from "../../controllers/doubt.controller";
import { isAuthenticated, authorizeRoles } from "../../middlewares/auth.middleware";

const doubtRouter = express.Router();

doubtRouter.post("/create-doubt", isAuthenticated, createDoubt);

doubtRouter.get("/get-doubts", isAuthenticated, getDoubts);

doubtRouter.get("/get-doubt/:id", isAuthenticated, getDoubtById);

doubtRouter.post("/add-doubt-reply", isAuthenticated, addDoubtReply);

doubtRouter.put(
  "/resolve-doubt/:id",
  isAuthenticated,
  authorizeRoles("admin", "teacher"),
  resolveDoubt
);

export default doubtRouter;

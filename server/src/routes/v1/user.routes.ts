import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getUserInfo,
  updateUserInfo,
  updatePassword,
  getUserDevices,
  revokeDevice,
  } from "../../controllers/user.controller";
  import { authorizeRoles, isAuthenticated } from "../../middlewares/auth.middleware";

  const userRouter = express.Router();

  userRouter.get("/me", isAuthenticated, getUserInfo);

  userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

  userRouter.put("/update-user-password", isAuthenticated, updatePassword);

  userRouter.get(
  "/get-user-devices/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserDevices
  );

  userRouter.delete(
  "/revoke-device/:deviceId",
  isAuthenticated,
  authorizeRoles("admin"),
  revokeDevice
  );

  userRouter.get(
  "/get-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter.put(
  "/update-user",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;

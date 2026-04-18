import type { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware";
import { redis } from "../config/redis";
import "dotenv/config";
import DeviceModel from "../models/device.model";

// get user info
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get all users --- only for admin
export const getAllUsers = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userModel.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user role --- only for admin
export const updateUserRole = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const user = await userModel.findOneAndUpdate(
        { email },
        { role },
        { new: true }
      );

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// delete user --- only for admin
export const deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      await user.deleteOne();

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user info
interface IUpdateUserInfo {
  name?: string;
}

export const updateUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (name && user) {
        user.name = name;
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update password
interface IUpdatePassword {
  oldPassword?: string;
  newPassword?: string;
}

export const updatePassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }

      const user = await userModel.findById(req.user?._id).select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid user", 400));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = newPassword;

      await user.save();

      await redis.set(req.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get user devices
export const getUserDevices = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // Student ID
      const devices = await DeviceModel.find({ userId: id });

      res.status(200).json({
        success: true,
        devices,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// revoke device
export const revokeDevice = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { deviceId } = req.params;
      await DeviceModel.deleteOne({ _id: deviceId });

      res.status(200).json({
        success: true,
        message: "Device revoked successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


import type { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";

// get users analytics --- only for admin
export const getUsersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get courses analytics --- only for admin
export const getCoursesAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthsData(CourseModel);

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get orders analytics --- only for admin
export const getOrdersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsData(OrderModel);

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get overview stats --- only for admin
export const getOverviewStats = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usersCount = await userModel.countDocuments();
      const coursesCount = await CourseModel.countDocuments();
      const ordersCount = await OrderModel.countDocuments();
      
      const courses = await CourseModel.find();
      const lessonsCount = courses.reduce((acc, curr) => acc + (curr.courseData?.length || 0), 0);

      res.status(200).json({
        success: true,
        stats: {
          users: usersCount,
          courses: coursesCount,
          orders: ordersCount,
          lessons: lessonsCount,
        },
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

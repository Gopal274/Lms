import type { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler";
import ResourceModel from "../models/resource.model";
import cloudinary from "cloudinary";

// Upload DPP/Notes/Assignment (Resource)
export const uploadResource = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, type, lessonId, courseId, file } = req.body;

      if (!file) {
        return next(new ErrorHandler("Please provide a file", 400));
      }

      // Uploading to cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(file, {
        folder: "resources",
        resource_type: "auto",
      });

      const resource = await ResourceModel.create({
        title,
        description,
        type: type || "pdf",
        lessonId,
        courseId,
        file: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });

      res.status(201).json({
        success: true,
        resource,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get resources for a lesson
export const getResourcesByLesson = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const resources = await ResourceModel.find({ lessonId }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        resources,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get resources for a course
export const getResourcesByCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const resources = await ResourceModel.find({ courseId }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        resources,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete resource
export const deleteResource = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await ResourceModel.findById(id);

      if (!resource) {
        return next(new ErrorHandler("Resource not found", 404));
      }

      // @ts-ignore
      await cloudinary.v2.uploader.destroy(resource.file.public_id);
      await resource.deleteOne();

      res.status(200).json({
        success: true,
        message: "Resource deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

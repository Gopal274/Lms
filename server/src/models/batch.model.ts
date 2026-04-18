import mongoose, { Document, Model, Schema } from "mongoose";

interface ISubject extends Document {
  title: string;
  teacherId: string; // User ID with role 'teacher'
  courseId: string;  // Link to a Course
}

export interface IBatch extends Document {
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "6 months"
  subjects: ISubject[];
  purchased: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
}

const subjectSchema = new Schema<ISubject>({
  title: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
});

const batchSchema = new Schema<IBatch>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  subjects: [subjectSchema],
  purchased: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    public_id: String,
    url: String,
  },
}, { timestamps: true });

const BatchModel: Model<IBatch> = mongoose.model("Batch", batchSchema);

export default BatchModel;

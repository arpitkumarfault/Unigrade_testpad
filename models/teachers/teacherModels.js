import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Teacher name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    universityEmail: {
      type: String,
      required: [true, "University email is required"],
      trim: true,
      lowercase: true,
    },
    // Add ObjectId reference for better queries
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    profileImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

teacherSchema.index({ email: 1 });
teacherSchema.index({ universityEmail: 1 });
teacherSchema.index({ universityId: 1 });

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;

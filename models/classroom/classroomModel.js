const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },
    classCode: {
      type: String,
      required: false,
      unique: true,
      uppercase: true,
      trim: true,
    },
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 1,
      default: 60,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "no description provided",
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

classroomSchema.index(
  { className: 1, section: 1 },
  { unique: true, name: "class_section_unique" }
);

// IMPORTANT: reuse existing model to avoid OverwriteModelError in Next.js
const Classroom =
  mongoose.models.Classroom || mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;

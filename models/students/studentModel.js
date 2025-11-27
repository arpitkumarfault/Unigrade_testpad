import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    department: {
        type: String,
        required: true,
        trim: true,
    },
    enrollmentNumber: {
        type: String,
        unique: true,
        required: true,
    },
    batch: {
        type: String,
        required: true,
        trim: true,
    },
    universityCode:{
      type:String,
      unique:true,
      required:false
    },
    
    teacherEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
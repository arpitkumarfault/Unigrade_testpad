import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    universityCode: {
        type: String,
        required: true,
        unique: true
    },
    universityName: {
        type: String,
        unique: true,
        required: true,
    },
    universityEmail: {
        type: String,
        unique: true,
        required: true
    },
    contactNumber: {
        type: Number,
        unique: true,
        required: true
    },
    address: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
}, { timestamps: true });

const University = mongoose.models.University || mongoose.model('University', universitySchema);
export default University;

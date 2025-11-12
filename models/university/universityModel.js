import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    universityCode: {
        type: String,
        require: true,
        unique: true
    },
    universityName: {
        type: String,
        unique: true,
        require: true,
    },
    universityEmail: {
        type: String,
        unique: true,
        require: true
    },
    contactNumber: {
        type: Number,
        unique: true,
        require: true
    },
    address: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        unique: true,
        require: true
    }
})

const University = mongoose.models.university || mongoose.model('university', universitySchema);
export default University
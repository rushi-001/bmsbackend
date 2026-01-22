import mongoose from "mongoose";

const academicYearsSchema = new mongoose.Schema({
    academic_year: {
        type: String,
        required: true,
        trim: true
    },
    start_date: {
        type: Date,
        required: true,
        trim: true
    },
    end_date: {
        type: Date,
        required: true,
        trim: true
    },
    is_current: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, versionKey: false })

const AcademicYears = mongoose.model("Academic_Years", academicYearsSchema);

export default AcademicYears;

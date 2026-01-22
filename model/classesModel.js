import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
    class_name: {
        type: String,
        required: true,
        trim: true
    },
    class_grade: {
        type: Number,
        required: true,
        trim: true
    },
}, { timestamps: true, versionKey: false })

const Classes = mongoose.model("Classes", classesSchema);

export default Classes;

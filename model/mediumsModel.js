import mongoose from "mongoose";

const mediumsSchema = new mongoose.Schema({
    medium_name: {
        type: String,
        required: true,
        trim: true
    },
    medium_code: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true, versionKey: false })

const Mediums = mongoose.model("Mediums", mediumsSchema);

export default Mediums;

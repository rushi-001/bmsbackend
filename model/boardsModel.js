import mongoose from "mongoose";

const boardsSchema = new mongoose.Schema({
    board_name: {
        type: String,
        required: true,
        trim: true
    },
    board_code: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true, versionKey: false })

const Boards = mongoose.model("Boards", boardsSchema);

export default Boards;

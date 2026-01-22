import mongoose from "mongoose";

const bookSetsSchema = new mongoose.Schema({
    book_set_name: {
        type: String,
        required: true,
        trim: true
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Boards",
        required: true,
    },
    medium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mediums",
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes",
        required: true,
    },
    academic_year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Academic_Years",
        required: true,
    },
}, { timestamps: true, versionKey: false })

const BookSets = mongoose.model("Book_Sets", bookSetsSchema);

export default BookSets;

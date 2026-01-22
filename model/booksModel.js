import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
}, { timestamps: true, versionKey: false })

const Books = mongoose.model("Books", booksSchema);

export default Books;

import mongoose from "mongoose";

const bookSetItemsSchema = new mongoose.Schema({
    book_sets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book_Sets",
        required: true,
        trim: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true, versionKey: false })

const BookSetItems = mongoose.model("Book_Set_Items", bookSetItemsSchema);

export default BookSetItems;

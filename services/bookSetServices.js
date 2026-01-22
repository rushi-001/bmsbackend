
import mongoose from "mongoose";
import { BookSetItemsRepository } from "../repositories/bookSetItemsRepository.js";
import { BookSetRepository } from "../repositories/bookSetRepository.js";

export class BookSetServices {
    constructor() {
        this.bookSetRepository = new BookSetRepository();
        this.bookSetItemsRepository = new BookSetItemsRepository();
    }

    createBookSet = async ({ board_id, medium_id, class_id, academic_year_id, book_set_name, books }) => {

        try {
            if (!board_id || !medium_id || !class_id || !academic_year_id || !book_set_name || !books) {
                throw new Error('All fields are required.');
            }

            const bookSet = await this.bookSetRepository.create({
                board: board_id,
                medium: medium_id,
                class: class_id,
                academic_year: academic_year_id,
                book_set_name,
                books,
            });

            return bookSet;
        } catch (error) {
            throw error;
        }
    }

    getAllBookSets = async ({ page, limit, searchTerm, boardId, mediumId, classId, academicYearId }) => {
        const filter = {};

        if (searchTerm) {
            filter.book_set_name = { $regex: searchTerm, $options: "i" };
        }

        // Convert string IDs to ObjectId
        if (boardId) filter.board = new mongoose.Types.ObjectId(boardId);
        if (mediumId) filter.medium = new mongoose.Types.ObjectId(mediumId);
        if (classId) filter.class = new mongoose.Types.ObjectId(classId);
        if (academicYearId) filter.academic_year = new mongoose.Types.ObjectId(academicYearId);

        const skip = (Number(page) - 1) * Number(limit);

        return await this.bookSetRepository.findWithFilter(
            filter,
            skip,
            Number(limit)
        );
    }

    updateBookSet = async ({ bookSetId, board_id, medium_id, class_id, academic_year_id, book_set_name, books }) => {
        try {
            if (!bookSetId || !board_id || !medium_id || !class_id || !academic_year_id || !book_set_name || !books) {
                throw new Error('All fields are required.');
            }

            const bookSetObjId = new mongoose.Types.ObjectId(bookSetId);

            const updatedBookSet = await this.bookSetRepository.updateWithId(
                bookSetObjId,
                {
                    board: new mongoose.Types.ObjectId(board_id),
                    medium: new mongoose.Types.ObjectId(medium_id),
                    class: new mongoose.Types.ObjectId(class_id),
                    academic_year: new mongoose.Types.ObjectId(academic_year_id),
                    book_set_name,
                    books
                }
            );

            // if (!updatedBookSet) {
            //     throw new Error("Book Set not found.");
            // }

            // await this.bookSetItemsRepository.deleteManyWithId(bookSetId);

            // const itemsPayload = books.map(item => ({
            //     book_sets: bookSetId,
            //     book: item.book_id,
            //     quantity: item.quantity ?? 1
            // }));

            // await this.bookSetItemsRepository.createMany(itemsPayload);

            return updatedBookSet;
        }
        catch (error) {
            throw error;
        }
    }

    deleteBookSet = async (bookSetId) => {
        try {
            if (!bookSetId) {
                throw new Error('Book Set ID is required.');
            }

            const deletedBookSet = await this.bookSetRepository.deleteWithId(bookSetId);

            if (!deletedBookSet) {
                throw new Error("Book Set not found.");
            }

            await this.bookSetItemsRepository.deleteManyWithId(bookSetId);
        }
        catch (error) {
            throw error;
        }
    }
}
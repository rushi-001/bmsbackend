import { BookSetServices } from "../services/bookSetServices.js";
import { apiResponse } from "../utils/apiResponse.js";

export class BookSetController {
    constructor() {
        this.bookSetServices = new BookSetServices();
    }

    handleCreateBookSet = async (req, res) => {
        try {
            const {
                board_id,
                medium_id,
                class_id,
                academic_year_id,
                book_set_name,
                books
            } = req.body;

            const bookSet = await this.bookSetServices.createBookSet({
                board_id,
                medium_id,
                class_id,
                academic_year_id,
                book_set_name,
                books
            });

            apiResponse.successResponse(res, 201, bookSet, "Book Set created successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 400, "Book Set creation failed.", error.message);
        }
    }

    handleGetAllBookSets = async (req, res) => {
        try {
            const { page, limit, searchTerm, boardId, mediumId, classId, academicYearId } = req.query;

            const bookSetsData = await this.bookSetServices.getAllBookSets({
                page: page || 1,
                limit: limit || 10,
                searchTerm: searchTerm || "",
                boardId,
                mediumId,
                classId,
                academicYearId
            });

            apiResponse.successResponse(res, 200, bookSetsData, "Book Sets retrieved successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 400, "Book Sets retrieval failed.", error.message);
        }
    }

    handleGetBookSetById = async (req, res) => {
        try {
            const { bookSetId } = req.params;

            const bookSet = await this.bookSetServices.getBookSetById(bookSetId);

            apiResponse.successResponse(res, 200, bookSet, "Book Set retrieved successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 400, "Book Set retrieval failed.", error.message);
        }
    }

    handleUpdateBookSet = async (req, res) => {
        try {
            const { bookSetId } = req.params;
            const {
                board_id,
                medium_id,
                class_id,
                academic_year_id,
                book_set_name,
                books
            } = req.body;

            const bookSet = await this.bookSetServices.updateBookSet({
                bookSetId,
                board_id,
                medium_id,
                class_id,
                academic_year_id,
                book_set_name,
                books
            });

            apiResponse.successResponse(res, 200, bookSet, "Book Set updated successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 400, "Book Set update failed.", error.message);
        }
    }

    handleDeleteBookSet = async (req, res) => {
        try {
            const { bookSetId } = req.params;

            const bookSet = await this.bookSetServices.deleteBookSet(bookSetId);

            apiResponse.successResponse(res, 200, bookSet, "Book Set deleted successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 400, "Book Set deletion failed.", error.message);
        }
    }
}
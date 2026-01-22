import { bookRepository } from "../repositories/bookRepository.js";
import { apiResponse } from "../utils/apiResponse.js";

export class bookController {
    getAllBooks = async (req, res) => {
        try {
            const bookData = await new bookRepository().findAll();
            apiResponse.successResponse(res, 200, bookData, "Books fetched successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 500, "Internal Server Error", error.message);
        }

    }
}
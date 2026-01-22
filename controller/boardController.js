import { boardRepository } from "../repositories/boardRepository.js";
import { apiResponse } from "../utils/apiResponse.js";

export class boardController {
    constructor() {
        this.boardRepository = new boardRepository();
    }

    getAllBoards = async (req, res) => {
        try {
            const boardData = await this.boardRepository.findAll();
            apiResponse.successResponse(res, 200, boardData, "Boards fetched successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 500, "Error while fetching boards", error.message);
        }
    }
}
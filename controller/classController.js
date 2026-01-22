import { classRepository } from "../repositories/classRepository.js";
import { apiResponse } from "../utils/apiResponse.js";

export class classController {
    constructor() {
        this.classRepository = new classRepository();
    }

    getAllClasses = async (req, res) => {
        try {
            const classData = await this.classRepository.findAll();
            apiResponse.successResponse(res, 200, classData, "Classes fetched successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 500, "Error while fetching classes", error.message);
        }
    }
}
import { apiResponse } from "../utils/apiResponse.js";
import { academicYearRepository } from "../repositories/academicYearRepository.js";

export class academicYearController {
    constructor() {
        this.academicYearRepository = new academicYearRepository();
    }
    getAllAcademicYears = async (req, res) => {
        try {
            const academicYearData = await this.academicYearRepository.findAll();
            apiResponse.successResponse(res, 200, academicYearData, "Academic years fetched successfully");
        } catch (error) {
            apiResponse.errorResponse(res, 500, "Error while fetching academic years", error.message);
        }
    }
}
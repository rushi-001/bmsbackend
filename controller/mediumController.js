import { mediumRepository } from "../repositories/mediumRepository.js";
import { apiResponse } from "../utils/apiResponse.js";

export class mediumController {
    constructor() {
        this.mediumRepository = new mediumRepository();
    }

    getAllMediums = async (req, res) => {
        try {
            const mediumData = await this.mediumRepository.findAll();
            apiResponse.successResponse(res, 200, mediumData, "Mediums fetched successfully!");
        } catch (error) {
            apiResponse.errorResponse(res, 500, "Internal server error!", error.message);
        }
    }
}
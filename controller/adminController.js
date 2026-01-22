import { apiResponse } from "../utils/apiResponse.js";
import { AdminServices } from "../services/adminServices.js";

export class AdminController {
    constructor() {
        this.adminServices = new AdminServices();
    }

    handleGetDashboard = async (req, res) => {
        try {
            const adminDashboardData = await this.adminServices.getAdminDashboardData();

            apiResponse.successResponse(res, 200, adminDashboardData, "Admin Dashboard Data fetched successfully.");
        } catch (error) {
            apiResponse.errorResponse(res, 500, "Cannot get admin dashboard data.", error.message);
        }
    }
}
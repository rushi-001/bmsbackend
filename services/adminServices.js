import { AdminDashboardRepository } from "../repositories/adminDashboardRepository.js";
import { AdminRepository } from "../repositories/adminRepository.js";

export class AdminServices {
    constructor() {
        this.adminRepository = new AdminRepository();
        this.adminDashboardRepository = new AdminDashboardRepository();
    }

    getAdminDashboardData = () => {
        return this.adminDashboardRepository.AdminDashboardData();
    }
}
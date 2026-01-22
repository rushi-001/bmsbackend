import Admin from "../model/adminModel.js";

export class AdminRepository {
    findAdminByEmail = (loginFormEmail) => {
        return Admin.findOne({
            email: loginFormEmail,
        });
    };

    findAdminById = (adminId) => {
        return Admin.findById(adminId);
    }

    saveAdminRefreshToken = (adminId, refreshToken) => {
        return Admin.findByIdAndUpdate(
            adminId,
            {
                refreshToken,
            },
            {
                new: true,
            }
        );
    };

    getAdminRefreshToken = (adminId) => {
        return Admin.findById(adminId).select("refreshToken");
    }
}


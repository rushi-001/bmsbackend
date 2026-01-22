import { AdminRepository } from "../repositories/adminRepository.js";
import { tokenUtils } from "./../utils/tokenUtils.js";

export class AuthService {

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    loginAdmin = async (loginFormData) => {
        // console.log("loginFormData: ", loginFormData);

        const { email, password } = loginFormData;

        let existingAdmin = await this.adminRepository.findAdminByEmail(email);

        if (!existingAdmin) {
            throw new Error("Invalid email or password!");
        }

        const isPasswordValid = await existingAdmin.comparePassword(
            password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid email or password!");
        }

        const { password: _password, refreshToken: _refreshToken, ...adminData } = existingAdmin.toObject();

        const accessToken = tokenUtils.generateAccessToken({
            _id: adminData._id,
        });

        const refreshToken = tokenUtils.generateRefreshToken({
            _id: adminData._id,
        })

        await this.adminRepository.saveAdminRefreshToken(
            adminData._id,
            refreshToken,
        )

        return { adminData, accessToken, refreshToken };
    }

    // --- Validating access token ---
    validateAccessToken = (incomingAccessToken) => {
        if (!incomingAccessToken) {
            throw new Error("Access token is required!")
        }

        return tokenUtils.verifyAccessToken(incomingAccessToken);

    }

    validateRefreshToken = async (adminId, incomingRefreshToken) => {
        const storedToken = await this.adminRepository.getAdminRefreshToken(adminId);

        console.log("stored token", storedToken)
        console.log("refresh token", incomingRefreshToken)

        if (storedToken?.refreshToken !== incomingRefreshToken) {
            throw new Error("Invalid refresh token!");
        }

        const isRefreshTokenValid = tokenUtils.verifyRefreshToken(incomingRefreshToken);

        if (!isRefreshTokenValid) {
            throw new Error("Invalid refresh token or expired!");
        }

        return isRefreshTokenValid;
    }

    logoutAdmin = async (adminId) => {
        const existingAdmin = await this.adminRepository.findAdminById(adminId);

        if (!existingAdmin) {
            throw new Error("Admin not found with given id!");
        }

        await this.adminRepository.saveAdminRefreshToken(adminId, null);
    }
}

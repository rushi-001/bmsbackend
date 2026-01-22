import { AuthService } from "./../services/authServices.js";
import { apiResponse } from "../utils/apiResponse.js";
import { tokenUtils } from "../utils/tokenUtils.js";

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    // Admin Login
    handleAdminLogin = async (req, res) => {
        try {
            const loginFormData = req.body;
            const { adminData, accessToken, refreshToken } = await this.authService.loginAdmin(loginFormData);

            // Set refresh token in cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            // Set access token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            apiResponse.successResponse(res, 200, {
                adminData,
            }, "Login successful");
        } catch (error) {
            apiResponse.errorResponse(res, 401, "Login failed: " + error.message, error);
        }
    }

    // --- Validate Access Token ---
    handleAccessToken = (req, res) => {
        try {

            const accessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1]

            this.authService.validateAccessToken(
                accessToken
            )

            apiResponse.successResponse(res, 200, { validation: true }, "Access token validation successful.")

        } catch (error) {
            console.log("handleAccessToken-method-error: ", error)
            apiResponse.errorResponse(res, 401, "Access token validation failed.", error.message)
        }
    }

    // Validate Refresh Token and generate new Access Token
    handleRefreshToken = async (req, res) => {
        try {
            const { adminId } = req.body;
            const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

            await this.authService.validateRefreshToken(
                adminId,
                incomingRefreshToken
            );

            const accessToken = tokenUtils.generateAccessToken({
                _id: adminId,
            });

            // Set new access token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            apiResponse.successResponse(res, 200, null, "Refresh token validation successful.");
        } catch (error) {
            apiResponse.errorResponse(res, 401, "Refresh token validation failed.", error.message);
        }
    }

    // Admin Logout
    handleAdminLogout = async (req, res) => {
        try {
            const { adminId } = req.body;

            await this.authService.logoutAdmin(adminId);

            // Clear access token cookie
            res.clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            // Clear refresh token cookie
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });

            apiResponse.successResponse(res, 200, null, "Logout successful.");
        } catch (error) {
            apiResponse.errorResponse(res, 401, "Logout failed: " + error.message, error);
        }
    }
}

import { AuthController } from "./../controller/authController.js";
import express from "express";


export class authRoutes {
    constructor() {
        this.authController = new AuthController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route("/login").post(this.authController.handleAdminLogin);
        this.router.route("/verify").post(this.authController.handleAccessToken);
        this.router.route("/refresh-token").post(this.authController.handleRefreshToken);
        this.router.route("/logout").post(this.authController.handleAdminLogout);
    }
};
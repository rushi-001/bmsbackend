import { AdminController } from "../controller/adminController.js";
import express from "express";

export class AdminRoutes {
    constructor() {
        this.adminController = new AdminController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/dashboard", this.adminController.handleGetDashboard);
    }
}

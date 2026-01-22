import { academicYearController } from "../controller/academicYearController.js";
import express from "express";

export class academicYearRoutes {
    constructor() {
        this.academicYearController = new academicYearController();
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.route("/").get(this.academicYearController.getAllAcademicYears);
    }
}
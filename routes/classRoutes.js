import { classController } from "../controller/classController.js";
import express from "express";

export class classRoutes {
    constructor() {
        this.router = express.Router();
        this.classController = new classController();
        this.initializeRoutes()
    }
    initializeRoutes() {
        this.router.route("/").get(this.classController.getAllClasses);
    }
}
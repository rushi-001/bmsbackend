import express from "express";
import { bookController } from "../controller/bookController.js";

export class bookRoutes {
    constructor() {
        this.router = express.Router();
        this.bookController = new bookController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route("/").get(this.bookController.getAllBooks);
    }
}

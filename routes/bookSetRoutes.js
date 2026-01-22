import { BookSetController } from "../controller/bookSetController.js";
import express from "express";

export class bookSetRoutes {
    constructor() {
        this.bookSetController = new BookSetController();
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.route("/").get(this.bookSetController.handleGetAllBookSets);
        this.router.route("/create").post(this.bookSetController.handleCreateBookSet);
        this.router.route("/:bookSetId")
            .put(this.bookSetController.handleUpdateBookSet)
            .delete(this.bookSetController.handleDeleteBookSet);
    }
}
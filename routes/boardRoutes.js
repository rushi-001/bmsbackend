import express from "express";
import { boardController } from "../controller/boardController.js";

export class boardRoutes {
    constructor() {
        this.router = express.Router();
        this.boardController = new boardController();
        this.routes()
    }

    routes = () => {
        this.router.get("/", this.boardController.getAllBoards);
    }
}
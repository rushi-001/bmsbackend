import { mediumController } from "../controller/mediumController.js";
import express from "express";

export class mediumRoutes {
    constructor() {
        this.router = express.Router();
        this.mediumController = new mediumController();
        this.routes()
    }

    routes = () => {
        this.router.get("/", this.mediumController.getAllMediums);
    }
}
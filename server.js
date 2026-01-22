import path from "path";

// ---Libraries Imports---
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ---Routes Imports---
import { authRoutes } from "./routes/authRoutes.js";
import { bookSetRoutes } from "./routes/bookSetRoutes.js";
import { AdminRoutes } from "./routes/adminRoutes.js";
import { boardRoutes } from "./routes/boardRoutes.js";
import { mediumRoutes } from "./routes/mediumRoutes.js";
import { classRoutes } from "./routes/classRoutes.js";
import { academicYearRoutes } from "./routes/academicYearRoutes.js";
import { bookRoutes } from "./routes/bookRoutes.js";

dotenv.config({ path: path.resolve("./config/.env") });

export class Server {
    constructor() {
        this.server = express();
        this.PORT = process.env.PORT || 8484;
        this.middlewares()
        this.routes()
    }

    // ---Middlewares---
    middlewares() {
        this.server.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
        this.server.use(express.json());
    }

    // ---Routes---
    routes() {
        this.server.get("/", (req, res) => res.send("API is running..."));

        this.server.use("/api/v1/auth", new authRoutes().router);
        this.server.use("/api/v1/admin", new AdminRoutes().router);
        this.server.use("/api/v1/book-set", new bookSetRoutes().router);
        this.server.use("/api/v1/book", new bookRoutes().router);
        this.server.use("/api/v1/board", new boardRoutes().router);
        this.server.use("/api/v1/medium", new mediumRoutes().router);
        this.server.use("/api/v1/class", new classRoutes().router);
        this.server.use("/api/v1/academic-year", new academicYearRoutes().router);
    }

    // ---Connect to MongoDB then Start Server--- 
    async start() {
        console.log(
            "--------------------------------------------------------------------------"
        );
        mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Connected to MongoDB");

                this.server.listen(this.PORT, () => {
                    console.log(`Server is running on http://localhost:${this.PORT}`);
                });
            })
            .catch((err) => {
                console.error("Failed to connect to MongoDB: ", err);
            });
    }
}

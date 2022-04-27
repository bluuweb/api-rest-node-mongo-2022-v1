import "dotenv/config";
import "./database/config.js";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import swagger from "./routes/swagger.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

// swagger docs route example
app.use("/api-docs", swagger);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("😍😍 http://localhost:" + PORT));

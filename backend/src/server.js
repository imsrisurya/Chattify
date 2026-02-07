import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'
import { connectDB } from "./lib/db.js"
import cors from "cors"

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
    connectDB();
});

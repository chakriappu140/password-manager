import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: 'https://password-manager-sk7v5qfhy-chakris-projects-3559a4fc.vercel.app', credentials: true }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server running at http://localhost:${process.env.PORT}`);
  });
}).catch(err => console.error("❌ MongoDB error:", err));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import sessionRoutes from "./routes/sessions";
import authRoutes from "./routes/auth";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Routes
app.use("/api/sessions", sessionRoutes);

app.get("/", (_req, res) => {
  res.send("Vi-Notes Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
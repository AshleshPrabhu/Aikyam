import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import regionRoutes from "./routes/regions.js";
import villageRoutes from "./routes/villages.js";
import vendorRoutes from "./routes/vendors.js";
import userRoutes from "./routes/users.js";
import assignmentRoutes from "./routes/assignment.js";
import userRoutes from "./routes/users.js";
import cors from 'cors';



dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
}));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use("/api/regions", regionRoutes);
app.use("/api/villages", villageRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";

// Import All 10 Backend API Routes
import authRoutes from "./routes/auth.routes.js";
import siteRoutes from "./routes/site.routes.js";
import equipmentRoutes from "./routes/equipment.routes.js";
import handoutRoutes from "./routes/handout.routes.js";
import vaultRoutes from "./routes/vault.routes.js";
import workforceRoutes from "./routes/workforce.routes.js";
import reportsRoutes from "./routes/reports.routes.js";
import materialsRoutes from "./routes/materials.routes.js";
import pettycashRoutes from "./routes/pettycash.routes.js";
import mpesaRoutes from "./routes/mpesa.routes.js";

dotenv.config();

const app = express();

// Configure CORS for Frontend Integration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "scribble-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport Authentication Middleware
app.use(passport.initialize());
app.use(passport.session());

// Mount All API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/handouts", handoutRoutes);
app.use("/api/vault", vaultRoutes);
app.use("/api/workforce", workforceRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/pettycash", pettycashRoutes);
app.use("/api/mpesa", mpesaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";
import leaveRoutes from "./routes/leaveRoutes";
import pool from "./config/db";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);

app.get("/", (_req, res): void => {
  res.send("Leave System API is running...");
});

app.get("/api/test-db", async (_req, res): Promise<void> => {
  try {
    const [rows] = await pool.query("SELECT NOW()");
    res.json({ success: true, time: (rows as any)[0]["NOW()"] });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "DB connection failed" });
  }
});

export default app;



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import pool from "./config/db"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Leave System API is running...");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW()");
    res.json({ success: true, time: (rows as any)[0]["NOW()"] });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ success: false, message: "DB connection failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, department } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO users (email, password, department) VALUES (?, ?, ?)`,
      [email, hashedPassword, department]
    );

    res.status(201).json({ message: "User registered", userId: (result as any).insertId });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req: express.Request, res: express.Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const [users] = await pool.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );
  
      if ((users as any).length === 0) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
  
      const user = (users as any)[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );
  
      res.json({ message: "Login successful", token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  export default router;
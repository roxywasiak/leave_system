import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // get user email
    const [rows]: any = await pool.execute(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];

    //  Retrieve stored salt and hash
    const { salt, passwordHash } = user;

    //  Re-hash the entered password using stored salt
    const hashedInputPassword = await bcrypt.hash(password, salt);

    //  Compare with stored hash
    const isMatch = hashedInputPassword === passwordHash;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    //  Make the JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // Respond with token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        surname: user.surname
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }

};

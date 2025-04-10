import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';
import { User } from '../models/User';


export const register = async (req: Request, res: Response) => {
  const { email, password, department, interests, availability, notifications } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(email, hashedPassword, department, interests, availability, notifications);
    const createdUser = await User.create(user);

    res.status(201).json({
      message: "User registered",
      user: { id: createdUser.id, email: createdUser.email }
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
  
};

import { Request, Response } from 'express';
import pool from '../config/db';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const { email, password, department, interests, availability, notifications } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      `INSERT INTO users (email, password, department, interests, availability, notifications)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, department, interests, availability, notifications]
    );
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

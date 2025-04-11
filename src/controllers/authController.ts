import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
   res.status(400).json({ message: "Email and password are required." });
   return;
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return
    }
    //  Re-hash the entered password using stored salt
    const hashedInputPassword = await bcrypt.hash(password, user.salt);

    //  Compare with stored hash
    const isMatch = hashedInputPassword === user.passwordHash;

    if (!isMatch) {
       res.status(401).json({ message: "Invalid email or password." });
       return
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

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await User.findByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const hashedInputPassword = await bcrypt.hash(password, user.salt);
    const isMatch = hashedInputPassword === user.passwordHash;

    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

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


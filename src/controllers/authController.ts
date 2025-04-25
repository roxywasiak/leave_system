import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface LoginRequestBody {
    email: string;
    password: string;
  }

// Login function
export const login: RequestHandler<{}, {}, LoginRequestBody> = async (req, res): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Compare the password to the hashed one in the database
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }


    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        role: user.role,
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
        surname: user.surname,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register function
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, department, firstName, surname } = req.body;  

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
      return;
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User(email, hashedPassword, department, firstName, surname);

    const result = await User.create(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: result.userId,
        email: result.email,
        role: result.role,
        firstName: result.firstName,
        surname: result.surname,
      },
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};






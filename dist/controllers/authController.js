"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
    }
    try {
        const user = await User_1.User.findByEmail(email);
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        //  Re-hash the entered password using stored salt
        const hashedInputPassword = await bcrypt_1.default.hash(password, user.salt);
        //  Compare with stored hash
        const isMatch = hashedInputPassword === user.passwordHash;
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        //  Make the JWT token
        const token = jsonwebtoken_1.default.sign({
            userId: user.userId,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
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
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.Login = Login;
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }
        const user = await User_1.User.findByEmail(email);
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        const hashedInputPassword = await bcrypt_1.default.hash(password, user.salt);
        const isMatch = hashedInputPassword === user.passwordHash;
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.userId,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
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
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;

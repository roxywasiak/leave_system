"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
// Login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
    }
    try {
        const user = yield User_1.User.findByEmail(email);
        if (!user) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        // Compare the password to the hashed one in the database
        const isMatch = yield bcrypt_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.userId,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
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
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, department, firstName, surname } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }
        const existingUser = yield User_1.User.findByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "Email already in use." });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = new User_1.User(email, hashedPassword, department, firstName, surname);
        const result = yield User_1.User.create(newUser);
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
    }
    catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.register = register;

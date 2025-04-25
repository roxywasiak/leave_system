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
exports.User = void 0;
const db_1 = __importDefault(require("../config/db"));
class User {
    constructor(firstName, surname, email, passwordHash, salt, role = "employee", annualLeaveBalance = 25, userId) {
        this.userId = userId;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.role = role;
        this.annualLeaveBalance = annualLeaveBalance;
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!User.isValidEmail(user.email)) {
                throw new Error("Invalid email address.");
            }
            const existingUser = yield User.findByEmail(user.email);
            if (existingUser) {
                throw new Error("User with this email already exists.");
            }
            const [result] = yield db_1.default.execute(`INSERT INTO user (firstName, surname, email, passwordHash, salt, role, annualLeaveBalance)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                user.firstName,
                user.surname,
                user.email,
                user.passwordHash,
                user.salt,
                user.role,
                user.annualLeaveBalance
            ]);
            user.userId = result.insertId;
            return user;
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || typeof email !== "string") {
                throw new Error("Invalid email address.");
            }
            const [rows] = yield db_1.default.execute("SELECT * FROM user WHERE email = ?", [email]);
            if (rows.length === 0)
                return null;
            const row = rows[0];
            return new User(row.firstName, row.surname, row.email, row.passwordHash, row.salt, row.role, row.annualLeaveBalance, row.userId);
        });
    }
    static isValidEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
}
exports.User = User;

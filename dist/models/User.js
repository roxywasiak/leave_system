"use strict";
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
    static async create(user) {
        const [result] = await db_1.default.execute(`INSERT INTO user (firstName, surname, email, passwordHash, salt, role, annualLeaveBalance)
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
    }
    static async findByEmail(email) {
        const [rows] = await db_1.default.execute("SELECT * FROM user WHERE email = ?", [email]);
        if (rows.length === 0)
            return null;
        const row = rows[0];
        return new User(row.firstName, row.surname, row.email, row.passwordHash, row.salt, row.role, row.annualLeaveBalance, row.userId);
    }
}
exports.User = User;

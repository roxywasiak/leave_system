
import pool from "../config/db";

export class User {
  userId?: number;
  firstName: string;
  surname: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: "employee" | "manager" | "admin";
  annualLeaveBalance: number;

  constructor(
    firstName: string,
    surname: string,
    email: string,
    passwordHash: string,
    salt: string,
    role: "employee" | "manager" | "admin" = "employee",
    annualLeaveBalance: number = 25,
    userId?: number
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.surname = surname;
    this.email = email;
    this.passwordHash = passwordHash;
    this.salt = salt;
    this.role = role;
    this.annualLeaveBalance = annualLeaveBalance;
  }

  static async create(user: User): Promise<User> {
    const [result] = await pool.execute(
      `INSERT INTO user (firstName, surname, email, passwordHash, salt, role, annualLeaveBalance)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.surname,
        user.email,
        user.passwordHash,
        user.salt,
        user.role,
        user.annualLeaveBalance
      ]
    );

    user.userId = (result as any).insertId;
    return user;
  }
}
  
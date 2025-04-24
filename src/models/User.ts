
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
    if(!User.isValidEmail(user.email)) {
      throw new Error("Invalid email address.");
    }

    const existingUser = await User.findByEmail(user.email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

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
  
  static async findByEmail(email: string): Promise<User | null> {
    if (!email ||typeof email !== "string") {
      throw new Error("Invalid email address.");
    }

    const [rows]: any = await pool.execute("SELECT * FROM user WHERE email = ?", [email]);
    if (rows.length === 0) return null;
    const row = rows[0];

    return new User(
      row.firstName,
      row.surname,
      row.email,
      row.passwordHash,
      row.salt,
      row.role,
      row.annualLeaveBalance,
      row.userId
    );
  }
  
  static isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
  
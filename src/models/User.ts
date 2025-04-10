import pool from "../config/db";     

export class User {
    id?: number;
    email: string;
    password: string;
    department: string;
    interests: string;
    availability: string;
    notifications: boolean;

    constructor(
      email: string,
      password: string,
      department: string,
      interests: string,
      availability: string,
      notifications: boolean,
      id?: number
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.department = department;
      this.interests = interests;
      this.availability = availability;
      this.notifications = notifications;
    }

    static async create(user: User): Promise<User> {
      const [result] = await pool.execute(
        `INSERT INTO users (email, password, department, interests, availability, notifications)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user.email, user.password, user.department, user.interests, user.availability, user.notifications]
      );
  
      user.id = (result as any).insertId;
      return user;
    }
  }
  
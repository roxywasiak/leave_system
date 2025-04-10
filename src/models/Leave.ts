import pool from "../config/db";     

export class Leave {
    id: number;
    userId: number;
    leaveTypeId: number;
    startDate: Date;
    endDate: Date;
    status: string;
    reason: string;

    constructor(id: number, userId: number, leaveTypeId: number, startDate: Date, endDate: Date, status: string, reason: string) {
        this.id = id;
        this.userId = userId;
        this.leaveTypeId = leaveTypeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.reason = reason;
    }

    static async create(leaveRequest: Leave): Promise<Leave> {
        const query = `
            INSERT INTO leave_requests (user_id, leave_type_id, start_date, end_date, reason, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            leaveRequest.userId,
            leaveRequest.leaveTypeId,
            leaveRequest.startDate.toISOString(),
            leaveRequest.endDate.toISOString(),
            leaveRequest.reason,
            leaveRequest.status
        ];
        const [result] = await pool.execute(query, params);
        const insertedId = (result as any).insertId;

        return new Leave(
            insertedId,
            leaveRequest.userId,
            leaveRequest.leaveTypeId,
            leaveRequest.startDate,
            leaveRequest.endDate,
            leaveRequest.status,
            leaveRequest.reason
        );
       
    }
    
    static async getAllLeaveRequests() {
        const query = `
            SELECT * FROM leave_requests
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }

    static async cancelLeave(leaveId: number): Promise<any> {
        const query = `UPDATE leave_requests SET status = 'Cancelled' WHERE id = ?`;
        const [result] = await pool.execute(query, [leaveId]);
        return result
}

    static async updateLeaveStatus(leaveId: number, status: string, reason: string): Promise<any> {
    const query = `
      UPDATE leave_requests
      SET status = ?, reason = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [status, reason, leaveId]);
    return result;
  }

    static async getLeaveRequestsByUserId(userId: number): Promise<any> {
    const query = `SELECT * FROM leave_requests WHERE user_id = ?`;
    const [rows] = await pool.execute(query, [userId]);
    return rows;
  }
  static async getRemainingLeaveDays(userId: number): Promise<number> {
    const [[user]]: any = await pool.execute(
      `SELECT annual_leave_balance FROM users WHERE id = ?`,
      [userId]
    );

    if (!user) throw new Error("User not found");

    const [rows]: any = await pool.execute(
      `SELECT start_date, end_date FROM leave_requests WHERE user_id = ? AND status = 'Approved'`,
      [userId]
    );

    let usedDays = 0;
    for (const leave of rows) {
      const start = new Date(leave.start_date);
      const end = new Date(leave.end_date);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      usedDays += days;
    }

    return user.annual_leave_balance - usedDays;
  }
}





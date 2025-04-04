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
    static async createLeaveRequest(leaveRequest: Leave) {
        const query = `
            INSERT INTO leave_requests (user_id, start_date, end_date, reason, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [leaveRequest.userId, leaveRequest.startDate, leaveRequest.endDate, leaveRequest.reason, leaveRequest.status]);
        return result;
    }
    static async getAllLeaveRequests() {
        const query = `
            SELECT * FROM leave_requests
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }
}


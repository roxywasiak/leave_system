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
        const params = [leaveRequest.userId, leaveRequest.leaveTypeId, leaveRequest.startDate, leaveRequest.endDate, leaveRequest.reason, leaveRequest.status];
        return new Promise((resolve) => {
            setTimeout(() => resolve(leaveRequest), 100);
        });
    }
    
    static async getAllLeaveRequests() {
        const query = `
            SELECT * FROM leave_requests
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }
}


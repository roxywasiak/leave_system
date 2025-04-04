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
    
    static async getAllLeaveRequests() {
        const query = `
            SELECT * FROM leave_requests
        `;
        const [rows] = await pool.execute(query);
        return rows;
    }
}


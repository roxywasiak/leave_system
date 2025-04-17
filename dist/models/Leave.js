"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leave = void 0;
const db_1 = __importDefault(require("../config/db"));
class Leave {
    constructor(id, userId, leaveTypeId, startDate, endDate, status, reason) {
        this.id = id || 0;
        this.userId = userId;
        this.leaveTypeId = leaveTypeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.reason = reason;
    }
    static async create(leaveRequest) {
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
        const [result] = await db_1.default.execute(query, params);
        const insertedId = result.insertId;
        return new Leave(insertedId, leaveRequest.userId, leaveRequest.leaveTypeId, leaveRequest.startDate, leaveRequest.endDate, leaveRequest.status, leaveRequest.reason);
    }
    static async getAllLeaveRequests() {
        const query = `
            SELECT * FROM leave_requests
        `;
        const [rows] = await db_1.default.execute(query);
        return rows;
    }
    static async cancelLeave(leaveId) {
        const query = `UPDATE leave_requests SET status = 'Cancelled' WHERE id = ?`;
        const [result] = await db_1.default.execute(query, [leaveId]);
        return result;
    }
    static async updateLeaveStatus(leaveId, status, reason) {
        const query = `
      UPDATE leave_requests
      SET status = ?, reason = ?
      WHERE id = ?
    `;
        const [result] = await db_1.default.execute(query, [status, reason, leaveId]);
        return result;
    }
    static async getLeaveRequestsByUserId(userId) {
        const query = `SELECT * FROM leave_requests WHERE user_id = ?`;
        const [rows] = await db_1.default.execute(query, [userId]);
        return rows;
    }
    static async getRemainingLeaveDays(userId) {
        const [[user]] = await db_1.default.execute(`SELECT annual_leave_balance FROM users WHERE id = ?`, [userId]);
        if (!user)
            throw new Error("User not found");
        const [rows] = await db_1.default.execute(`SELECT start_date, end_date FROM leave_requests WHERE user_id = ? AND status = 'Approved'`, [userId]);
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
exports.Leave = Leave;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingLeave = exports.getUserLeaveStatus = exports.rejectLeave = exports.approveLeave = exports.cancelLeave = exports.requestLeave = exports.getAllLeaveRequests = void 0;
const Leave_1 = require("../models/Leave");
const getAllLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave_1.Leave.getAllLeaveRequests();
        res.status(200).json(leaves);
    }
    catch (err) {
        console.error("Error fetching leave requests:", err);
        res.status(500).json({ message: "Failed to fetch leave requests" });
    }
};
exports.getAllLeaveRequests = getAllLeaveRequests;
const requestLeave = async (req, res) => {
    const { userId, leaveTypeId, startDate, endDate, reason } = req.body;
    if (!userId || !leaveTypeId || !startDate || !endDate) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const newLeave = new Leave_1.Leave(0, userId, leaveTypeId, new Date(startDate), new Date(endDate), "Pending", reason);
        const createdLeave = await Leave_1.Leave.create(newLeave);
        res.status(201).json({ message: "Leave request submitted", data: createdLeave });
    }
    catch (err) {
        console.error("Error requesting leave:", err);
        res.status(500).json({ message: "Failed to request leave" });
    }
};
exports.requestLeave = requestLeave;
const cancelLeave = async (req, res) => {
    const { leaveId } = req.params;
    try {
        const result = await Leave_1.Leave.cancelLeave(Number(leaveId));
        res.status(200).json({ message: "Leave request cancelled", result });
    }
    catch (err) {
        console.error("Error cancelling leave:", err);
        res.status(500).json({ message: "Failed to cancel leave" });
    }
}; //update model to have  all the leavetypes
exports.cancelLeave = cancelLeave;
const approveLeave = async (req, res) => {
    const { leaveId } = req.body;
    try {
        const result = await Leave_1.Leave.updateLeaveStatus(leaveId, "Approved", "Approved by manager");
        res.status(200).json({ message: `Leave ${leaveId} approved`, result });
    }
    catch (err) {
        console.error("Error approving leave:", err);
        res.status(500).json({ message: "Failed to approve leave" });
    }
};
exports.approveLeave = approveLeave;
const rejectLeave = async (req, res) => {
    const { leaveId, reason } = req.body;
    try {
        const result = await Leave_1.Leave.updateLeaveStatus(leaveId, "Rejected", reason || "No reason provided");
        res.status(200).json({ message: `Leave ${leaveId} rejected`, result });
    }
    catch (err) {
        console.error("Error rejecting leave:", err);
        res.status(500).json({ message: "Failed to reject leave" });
    }
};
exports.rejectLeave = rejectLeave;
const getUserLeaveStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await Leave_1.Leave.getLeaveRequestsByUserId(Number(userId));
        res.status(200).json({ message: "Leave request status", data: result });
    }
    catch (err) {
        console.error("Error fetching leave status:", err);
        res.status(500).json({ message: "Failed to fetch leave status" });
    }
};
exports.getUserLeaveStatus = getUserLeaveStatus;
const getRemainingLeave = async (req, res) => {
    const { userId } = req.params;
    try {
        const remaining = await Leave_1.Leave.getRemainingLeaveDays(Number(userId));
        res.status(200).json({ message: "Remaining leave days", data: { remaining } });
    }
    catch (err) {
        console.error("Error getting remaining leave:", err);
        res.status(500).json({ message: "Failed to get remaining leave" });
    }
};
exports.getRemainingLeave = getRemainingLeave;

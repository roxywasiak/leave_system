"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Leave_1 = require("../models/Leave");
const router = express_1.default.Router();
router.post("/leave-request", async (req, res) => {
    const { userId, leaveTypeId, startDate, endDate, reason, status } = req.body;
    try {
        const leaveRequest = new Leave_1.Leave(userId, leaveTypeId, startDate, endDate, reason, status, new Date().toISOString());
        const result = await Leave_1.Leave.create(leaveRequest);
        res.status(201).json({ message: "Leave request created successfully", result });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create leave request", error });
    }
});
router.get("/leave-requests", async (req, res) => {
    try {
        const leaveRequests = await Leave_1.Leave.getAllLeaveRequests();
        res.status(200).json(leaveRequests);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch leave requests", error });
    }
});
exports.default = router;

import express from "express";
import { Leave } from "../models/Leave"; 

const router = express.Router();

router.post("/leave-request", async (req, res) => {
    const { userId, leaveTypeId, startDate, endDate, reason, status } = req.body;

    try {
        const leaveRequest = new Leave(userId, leaveTypeId, startDate, endDate, reason, status, new Date().toISOString());
        const result = await Leave.create(leaveRequest); 
        res.status(201).json({ message: "Leave request created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to create leave request", error });
    }
});

router.get("/leave-requests", async (req, res) => {
    try {
        const leaveRequests = await Leave.getAllLeaveRequests();
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leave requests", error });
    }
});

export default router;

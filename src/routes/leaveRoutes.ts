import express from "express";
import { Leave } from "../models/Leave"; 

const router = express.Router();

// Route to create a new leave request
router.post("/leave-request", async (req, res) => {
    const { user_id, start_date, end_date, reason, status } = req.body;

    try {
        const leaveRequest =   ({ userId, startDate, endDate, reason, status });
        const result = await leaveRequest.createLeaveRequest(leaveRequest);
        res.status(201).json({ message: "Leave request created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Failed to create leave request", error });
    }
});

// Route to get all leave requests
router.get("/leave-requests", async (req, res) => {
    try {
        const leaveRequests = await Leave.getAllLeaveRequests();
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leave requests", error });
    }
});

export default router;

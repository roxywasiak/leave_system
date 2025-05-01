// src/routes/leaveRoutes.ts
import { Router, RequestHandler, Response } from "express";
import { Leave } from "../models/Leave";

interface LeaveRequestBody {
  userId:      number;
  leaveTypeId: number;
  startDate:   string;
  endDate:     string;
  reason:      string;
  status:      string;
}

// 1) Define your handler with RequestHandler<Params, ResBody, ReqBody>
const createLeave: RequestHandler<{}, 
                                  { message: string; result: Leave }, 
                                  LeaveRequestBody> = 
async (req, res: Response<{ message: string; result: Leave }>) => {
  // now TS knows req.body is LeaveRequestBody
  const { userId, leaveTypeId, startDate, endDate, reason, status } = req.body;

  if (!userId || !leaveTypeId || !startDate || !endDate) {
    res.status(400).json({ message: "Missing required fields", result: null! });
  }

  try {
    const leaveRequest = new Leave(
      undefined,
      userId,
      leaveTypeId,
      new Date(startDate),
      new Date(endDate),
      status,
      reason
    );
    const result = await Leave.create(leaveRequest);
      res.status(201).json({ message: "Leave request created successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Failed to create leave request", result: null! });
    }
}

const router = Router();

// 2) Plug your typed handler in
router.post("/leave-request", createLeave);

router.get("/leave-requests", async (req, res) => {
  try {
    const leaveRequests = await Leave.getAllLeaveRequests();
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leave requests", error });
  }
});

export default router;
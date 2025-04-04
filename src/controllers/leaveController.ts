import { Request, Response } from "express";
import { Leave } from "../models/Leave";

export const getAllLeaveRequests = async (req: Request, res: Response) => {
  try {
    const leaves = await Leave.getAllLeaveRequests();
    res.status(200).json(leaves);
  } catch (err) {
    console.error("Error fetching leave requests:", err);
    res.status(500).json({ message: "Failed to fetch leave requests" });
  }
};

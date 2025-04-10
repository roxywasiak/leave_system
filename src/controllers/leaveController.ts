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

export const requestLeave = async (req: Request, res: Response) => { ... };
export const cancelLeave = async (req: Request, res: Response) => { ... };
export const approveLeave = async (req: Request, res: Response) => { ... };
export const rejectLeave = async (req: Request, res: Response) => { ... };
export const getUserLeaveStatus = async (req: Request, res: Response) => { ... };
export const getRemainingLeave = async (req: Request, res: Response) => { ... };
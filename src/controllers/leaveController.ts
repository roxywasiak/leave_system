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

export const requestLeave = async (req: Request, res: Response) => { 
  const { userId, leaveTypeId, startDate, endDate, reason } = req.body;

  if (!userId || !leaveTypeId || !startDate || !endDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newLeave = new Leave(userId, leaveTypeId, new Date(startDate), new Date(endDate), "Pending", reason, null);
    const createdLeave = await Leave.create(newLeave);

    res.status(201).json({ message: "Leave request submitted", data: createdLeave });
  } catch (err) {
    console.error("Error requesting leave:", err);
    res.status(500).json({ message: "Failed to request leave" });
  }
 };

export const cancelLeave = async (req: Request, res: Response) => {const { leaveId } = req.params;

try {
  const result = await Leave.cancelLeave(Number(leaveId));
  res.status(200).json({ message: "Leave request cancelled", result });
} catch (err) {
  console.error("Error cancelling leave:", err);
  res.status(500).json({ message: "Failed to cancel leave" });
}
};//update model to have  all the leavetypes

export const approveLeave = async (req: Request, res: Response) => {  const { leaveId } = req.body;

try {
  const result = await Leave.updateLeaveStatus(leaveId, "Approved", "Approved by manager");
  res.status(200).json({ message: `Leave ${leaveId} approved`, result });
} catch (err) {
  console.error("Error approving leave:", err);
  res.status(500).json({ message: "Failed to approve leave" });
} };

export const rejectLeave = async (req: Request, res: Response) => {  const { leaveId, reason } = req.body;

try {
  const result = await Leave.updateLeaveStatus(leaveId, "Rejected", reason || "No reason provided");
  res.status(200).json({ message: `Leave ${leaveId} rejected`, result });
} catch (err) {
  console.error("Error rejecting leave:", err);
  res.status(500).json({ message: "Failed to reject leave" });
} };

export const getUserLeaveStatus = async (req: Request, res: Response) => { const { userId } = req.params;

try {
  const result = await Leave.getLeaveRequestsByUserId(Number(userId));
  res.status(200).json({ message: "Leave request status", data: result });
} catch (err) {
  console.error("Error fetching leave status:", err);
  res.status(500).json({ message: "Failed to fetch leave status" });
} };

export const getRemainingLeave = async (req: Request, res: Response) => {  const { userId } = req.params;

try {
  const remaining = await Leave.getRemainingLeaveDays(Number(userId));
  res.status(200).json({ message: "Remaining leave days", data: { remaining } });
} catch (err) {
  console.error("Error getting remaining leave:", err);
  res.status(500).json({ message: "Failed to get remaining leave" });
} };
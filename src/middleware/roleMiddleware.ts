import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const authoriseRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient privileges." });
      }
      next();
    };
  };
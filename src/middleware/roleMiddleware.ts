import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const authoriseRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: "Access denied" });
      } else {
        next();
      }
    };

  };
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'; 

export interface AuthRequest extends Request {
    user?: any;
    headers: {
        authorization?: string;
        [key: string]: any;
    };
}
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
      req.user = decoded as any;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token." });
    }

  };


import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'; 

export interface AuthRequest extends Request {
    user?: { id: number; email: string };//TOKEN 
}

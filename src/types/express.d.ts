import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      user?: {
        userId: number;
        email: string;
        role: string;     
        firstName: string;        
        surname: string;}
      body: any; 
      params: {[key:string]: string | undefined}; 
      
    }
  }
}

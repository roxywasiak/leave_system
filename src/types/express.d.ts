import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      body: any; 
      params: {[key:string]: string | undefined}; 
      user?: any; 
    }
  }
}

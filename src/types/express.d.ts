import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      user?: any; // Add custom properties (e.g., user object from JWT)
    }
  }
}

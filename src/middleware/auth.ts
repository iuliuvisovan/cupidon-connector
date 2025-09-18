import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface AuthenticatedRequest extends Request {
  isAuthenticated?: boolean;
}

export const verifyGlovoSignature = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-glovo-token'] as string;
  const expectedToken = process.env.GLOVO_SHARED_TOKEN;

  console.log('🔐 [AUTH] Simple token verification');
  console.log('🔐 [AUTH] Expected token:', expectedToken);
  console.log('🔐 [AUTH] Provided token:', token);

  if (!expectedToken) {
    console.error('❌ [AUTH] GLOVO_SHARED_TOKEN not configured');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
      timestamp: new Date().toISOString()
    });
  }

  if (!token) {
    console.warn('❌ [AUTH] Missing token in webhook request');
    return res.status(401).json({
      success: false,
      message: 'Missing authentication token',
      timestamp: new Date().toISOString()
    });
  }

  if (token !== expectedToken) {
    console.warn('❌ [AUTH] Invalid token in webhook request');
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
      timestamp: new Date().toISOString()
    });
  }

  console.log('✅ [AUTH] Token verification successful');
  req.isAuthenticated = true;
  next();
};
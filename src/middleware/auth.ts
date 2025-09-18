import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface AuthenticatedRequest extends Request {
  isAuthenticated?: boolean;
}

export const verifyGlovoSignature = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const signature = req.headers['x-glovo-signature'] as string;
  const sharedToken = process.env.GLOVO_SHARED_TOKEN;

  if (!sharedToken) {
    console.error('GLOVO_SHARED_TOKEN not configured');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
      timestamp: new Date().toISOString()
    });
  }

  if (!signature) {
    console.warn('Missing signature in webhook request');
    return res.status(401).json({
      success: false,
      message: 'Missing signature',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', sharedToken)
      .update(payload)
      .digest('hex');

    const providedSignature = signature.replace('sha256=', '');

    if (!crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(providedSignature, 'hex')
    )) {
      console.warn('Invalid signature in webhook request');
      return res.status(401).json({
        success: false,
        message: 'Invalid signature',
        timestamp: new Date().toISOString()
      });
    }

    req.isAuthenticated = true;
    next();
  } catch (error) {
    console.error('Error verifying signature:', error);
    return res.status(401).json({
      success: false,
      message: 'Authentication failed',
      timestamp: new Date().toISOString()
    });
  }
};
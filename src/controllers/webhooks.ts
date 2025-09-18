import { Request, Response } from 'express';
import { GlovoOrderNotification, WebhookResponse } from '../types/glovo';
import { AuthenticatedRequest } from '../middleware/auth';

export const handleDispatchedOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const notification: GlovoOrderNotification = req.body;

    console.log('📦 Received dispatched order notification:', {
      webhook_id: notification.webhook_id,
      order_id: notification.order_id,
      store_id: notification.store_id,
      timestamp: notification.timestamp,
      event_type: notification.event_type
    });

    // TODO: Implement your business logic here
    // Examples:
    // - Save order to database
    // - Send notification to internal systems
    // - Update inventory
    // - Trigger fulfillment process

    const response: WebhookResponse = {
      success: true,
      message: 'Order dispatched notification processed successfully',
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing dispatched order:', error);

    const response: WebhookResponse = {
      success: false,
      message: 'Failed to process dispatched order notification',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};

export const handleCancelledOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const notification: GlovoOrderNotification = req.body;

    console.log('❌ Received cancelled order notification:', {
      webhook_id: notification.webhook_id,
      order_id: notification.order_id,
      store_id: notification.store_id,
      timestamp: notification.timestamp,
      event_type: notification.event_type
    });

    // TODO: Implement your business logic here
    // Examples:
    // - Update order status in database
    // - Restore inventory
    // - Send cancellation notification
    // - Update analytics

    const response: WebhookResponse = {
      success: true,
      message: 'Order cancelled notification processed successfully',
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing cancelled order:', error);

    const response: WebhookResponse = {
      success: false,
      message: 'Failed to process cancelled order notification',
      timestamp: new Date().toISOString()
    };

    res.status(500).json(response);
  }
};

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'glovo-webhook-service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};
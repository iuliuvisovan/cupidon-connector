export interface GlovoOrderNotification {
  webhook_id: string;
  order_id: string;
  store_id: string;
  timestamp: string;
  event_type: 'order.dispatched' | 'order.cancelled';
  order_data?: any;
}

export interface GlovoWebhookHeaders {
  'x-glovo-signature'?: string;
  'content-type': string;
  'user-agent'?: string;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  timestamp: string;
  receivedData?: any;
}
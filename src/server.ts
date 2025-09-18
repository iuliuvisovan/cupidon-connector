import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import glovoRoutes from './routes/glovo';
import { healthCheck } from './controllers/webhooks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/health', healthCheck);
app.get('/', (req, res) => {
  res.json({
    service: 'Glovo Webhook Service',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      dispatched: '/glovo/orders/dispatched',
      cancelled: '/glovo/orders/cancelled'
    }
  });
});

app.use('/glovo', glovoRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Glovo webhook service running on port ${PORT}`);
  console.log(`📍 Webhook endpoints:`);
  console.log(`   - Dispatched: https://yourserver.com/glovo/orders/dispatched`);
  console.log(`   - Cancelled:  https://yourserver.com/glovo/orders/cancelled`);
  console.log(`🔧 Health check: https://yourserver.com/health`);
});